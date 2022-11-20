import jwt from "@tsndr/cloudflare-worker-jwt";
import { CLAIM_WORKSPACES } from "../constants/admin.const";
import { HOUR } from "../constants/duration.const";
import { getJwks } from "../constants/jwks.const";
import { ErrorType, FlethyError } from "../utils/error.utils";
import { ValidationUtils } from "../utils/validation.utils";
import { Workspace } from "./workspace.controller";

export enum WorkspaceRole {
  OWNER = "o",
  ADMIN = "a",
  MEMBER = "m",
}

export enum ProjectRole {
  OWNER = "o",
  ADMIN = "a",
  MEMBER = "m",
}

export enum TokenScope {
  WORKFLOW_CREATE = "workflow:create",
  WORKFLOW_READ = "workflow:read",
  WORKFLOW_UPDATE = "workflow:update",
  WORKFLOW_DELETE = "workflow:delete",
  INSTANCE_CREATE = "instance:create",
  WORKSPACE_CREATE = "workspace:create",
  WORKSPACE_READ = "workspace:read",
  WORKSPACE_UPDATE = "workspace:update",
  WORKSPACE_DELETE = "workspace:delete",
  PROJECT_CREATE = "project:create",
  PROJECT_READ = "project:read",
  PROJECT_UPDATE = "project:update",
  PROJECT_DELETE = "project:delete",
  SECRET_CREATE = "secret:create",
  SECRET_READ = "secret:read",
  SECRET_UPDATE = "secret:update",
  SECRET_DELETE = "secret:delete",
}

export interface TokenRequest {
  projectId: string;
  workspaceId: string;
  scopes?: TokenScope[];
  expiration?: number;
}

export interface TokenVerificationRequest extends TokenRequest {
  token: string;
}

export class AuthController {
  public static async verifyToken(
    request: TokenVerificationRequest,
    secret: string
  ) {
    const tokenIsValid = await jwt.verify(request.token, secret);
    if (!tokenIsValid) {
      throw new FlethyError({
        type: ErrorType.Unauthorized,
        message: `Token is invalid`,
        log: {
          context: { origin: "auth.controller.ts", method: "verifyToken" },
          message: `Validation error: Token is invalid`,
        },
      });
    }
    const { payload } = jwt.decode(request.token);
    const validation = ValidationUtils.validateAll([
      {
        value: request.projectId,
        parameter: "projectId",
        checks: { required: true, stringEquals: payload.projectId },
      },
      {
        value: request.workspaceId,
        parameter: "workspaceId",
        checks: { required: true, stringEquals: payload.workspaceId },
      },
      {
        value: payload.scopes,
        parameter: "scopes",
        checks: { required: true, arrayValuesInArrayValues: request.scopes },
      },
      {
        value: payload.expiration,
        parameter: "expiration",
        checks: { numberGreaterEqualsThan: Date.now() },
      },
    ]);
    if (!validation.valid) {
      throw new FlethyError({
        type: ErrorType.Forbidden,
        message: validation.message,
        log: {
          context: { origin: "auth.controller.ts", method: "verifyToken" },
          message: `Validation error: ${validation.message}`,
        },
      });
    }
  }

  public static async createToken(
    request: TokenRequest,
    secret: string
  ): Promise<string> {
    // validation
    const validation = ValidationUtils.validateAll([
      {
        value: request.projectId,
        parameter: "projectId",
        checks: { required: true, minStringLength: 1 },
      },
      {
        value: request.workspaceId,
        parameter: "workspaceId",
        checks: { required: true, minStringLength: 1 },
      },
      {
        value: request.scopes,
        parameter: "scopes",
        checks: { required: true, arrayMinLength: 1 },
      },
      {
        value: request.expiration,
        parameter: "expiration",
        checks: { numberGreaterEqualsThan: Date.now() + HOUR },
      },
    ]);
    if (!validation.valid) {
      throw new FlethyError({
        type: ErrorType.BadRequest,
        message: validation.message,
        log: {
          context: { origin: "auth.controller.ts", method: "createToken" },
          message: `Validation error: ${validation.message}`,
        },
      });
    }

    // create token
    const token = await jwt.sign(request, secret);
    return token;
  }

  public static async verifyUserToken(
    encodedToken: string,
    options?: { workspaceId: string; projectId: string; scopes: TokenScope[] }
  ): Promise<{ payload: any; scopes: TokenScope[] }> {
    const token = decodeJwt(encodedToken);
    const encoder = new TextEncoder();
    const data = encoder.encode(
      [token.raw.header, token.raw.payload].join(".")
    );
    const signature = new Uint8Array(
      Array.from(token.signature).map((c) => c.charCodeAt(0))
    );

    const key = await crypto.subtle.importKey(
      "jwk",
      getJwks(),
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["verify"]
    );
    const verificationResult = await crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5",
      key,
      signature,
      data
    );
    if (!verificationResult) {
      throw new FlethyError({
        type: ErrorType.Unauthorized,
        message: `Token is invalid`,
        log: {
          context: { origin: "auth.controller.ts", method: "verifyUserToken" },
          message: `Token is invalid`,
        },
      });
    }
    let scopes: TokenScope[] = [];
    if (options) {
      scopes = AuthController.accessTokenScopes({
        workspaces: token.payload[CLAIM_WORKSPACES],
        projectId: options.projectId,
        workspaceId: options.workspaceId,
      });
      if (options?.scopes && options.scopes.length > 0) {
        for (const scope of options.scopes) {
          if (!scopes.includes(scope)) {
            throw new FlethyError({
              type: ErrorType.Forbidden,
              message: `Unsufficient Permissions`,
              log: {
                context: {
                  origin: "auth.controller.ts",
                  method: "verifyUserToken",
                },
                message: `Unsufficient Permissions`,
              },
            });
          }
        }
      }
    }
    return { payload: token.payload, scopes };
  }

  public static accessTokenScopes(request: {
    workspaces: Workspace[];
    workspaceId: string;
    projectId: string;
  }): TokenScope[] {
    const scopes: Set<TokenScope> = new Set<TokenScope>();
    const foundWorkspace = request.workspaces.find(
      (workspace) => workspace.id === request.workspaceId
    );
    if (foundWorkspace) {
      if (
        foundWorkspace.r.includes(WorkspaceRole.OWNER) ||
        foundWorkspace.r.includes(WorkspaceRole.ADMIN)
      ) {
        scopes.add(TokenScope.WORKSPACE_READ);
        scopes.add(TokenScope.WORKSPACE_CREATE);
        scopes.add(TokenScope.WORKSPACE_UPDATE);
      }
      if (foundWorkspace.r.includes(WorkspaceRole.MEMBER)) {
        scopes.add(TokenScope.WORKSPACE_READ);
      }
      const foundProject = foundWorkspace.p.find(
        (project) => project.id === request.projectId
      );
      if (foundProject) {
        if (
          foundProject.r.includes(ProjectRole.OWNER) ||
          foundProject.r.includes(ProjectRole.ADMIN)
        ) {
          scopes.add(TokenScope.PROJECT_READ);
          scopes.add(TokenScope.PROJECT_UPDATE);
          scopes.add(TokenScope.PROJECT_DELETE);
          scopes.add(TokenScope.WORKFLOW_CREATE);
          scopes.add(TokenScope.WORKFLOW_READ);
          scopes.add(TokenScope.WORKFLOW_UPDATE);
          scopes.add(TokenScope.WORKFLOW_DELETE);
          scopes.add(TokenScope.INSTANCE_CREATE);
          scopes.add(TokenScope.SECRET_CREATE);
          scopes.add(TokenScope.SECRET_READ);
          scopes.add(TokenScope.SECRET_UPDATE);
          scopes.add(TokenScope.SECRET_DELETE);
        }
        if (foundProject.r.includes(ProjectRole.MEMBER)) {
          scopes.add(TokenScope.PROJECT_READ);
          scopes.add(TokenScope.WORKFLOW_CREATE);
          scopes.add(TokenScope.WORKFLOW_READ);
          scopes.add(TokenScope.WORKFLOW_UPDATE);
          scopes.add(TokenScope.WORKFLOW_DELETE);
        }
      }
    }
    return Array.from(scopes);
  }
}

function decodeJwt(token: string) {
  const parts = token.split(".");
  const header = JSON.parse(atob(parts[0]));
  const payload = JSON.parse(atob(parts[1]));
  const signature = atob(parts[2].replace(/_/g, "/").replace(/-/g, "+"));
  return {
    header: header,
    payload: payload,
    signature: signature,
    raw: { header: parts[0], payload: parts[1], signature: parts[2] },
  };
}
