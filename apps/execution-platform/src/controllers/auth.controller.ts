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

export class AuthController {
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
