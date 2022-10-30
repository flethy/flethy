import jwt from "@tsndr/cloudflare-worker-jwt";
import { HOUR } from "../constants/duration.const";
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
  scopes: TokenScope[];
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
}
