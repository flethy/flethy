import jwt from "@tsndr/cloudflare-worker-jwt";
import { HOUR } from "../constants/duration.const";
import { JWK_DEV } from "../constants/jwks.const";
import { ErrorType, FlethyError } from "../utils/error.utils";
import { ValidationUtils } from "../utils/validation.utils";

export enum TokenScope {
  WORKFLOW_CREATE = "workflow:create",
  WORKFLOW_READ = "workflow:read",
  WORKFLOW_UPDATE = "workflow:update",
  WORKFLOW_DELETE = "workflow:delete",
  INSTANCE_CREATE = "instance:create",
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

  public static async verifyUserToken(encodedToken: string): Promise<boolean> {
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
      JWK_DEV,
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
    return verificationResult;
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
