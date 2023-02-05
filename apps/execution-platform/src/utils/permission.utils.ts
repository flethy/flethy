import { ServerRequest } from "worktop/request";
import { ServerResponse } from "worktop/response";
import { SECRETS } from "../constants/envvar.const";
import { AuthController, TokenScope } from "../controllers/auth.controller";
import { ErrorType, FlethyError } from "./error.utils";

export interface PermissionsResponse {
  valid: boolean;
  userId: string;
  userTokenPayload?: any;
}

export class PermissionUtils {
  public static async permissions(
    req: ServerRequest,
    _res: ServerResponse,
    options: {
      scopes?: TokenScope[];
      isUserToken?: boolean;
      isInterServiceToken?: boolean;
    }
  ) {
    const { scopes, isUserToken, isInterServiceToken } = options;
    let response: PermissionsResponse = {
      valid: false,
      userId: "",
    };
    if (isInterServiceToken === true) {
      const Authorization = req.headers.get("Authorization");
      if (!Authorization || Authorization !== SECRETS.config.interServiceAuth) {
        throw new FlethyError({
          type: ErrorType.Unauthorized,
          message: `Missing or invalid Authorization header`,
          log: {
            context: {
              origin: "permission.utils.ts",
              method: "permissions",
            },
            message: `Missing or invalid Authorization header`,
          },
        });
      }
      response.userId = "s2s";
      response.valid = true;
    } else if (scopes || isUserToken === true) {
      const Authorization = req.headers.get("Authorization");
      const { projectId, workspaceId } = req.params;
      if (!Authorization) {
        throw new FlethyError({
          type: ErrorType.Unauthorized,
          message: `Missing Authorization header`,
          log: {
            context: {
              origin: "permission.utils.ts",
              method: "permissions",
            },
            message: `Missing Authorization header`,
          },
        });
      }
      response.valid = false;
      const token = Authorization.replace("Bearer ", "");
      if (isUserToken === true) {
        const options =
          projectId || workspaceId
            ? { projectId, workspaceId, scopes: scopes ?? [] }
            : undefined;
        const verificationResponse = await AuthController.verifyUserToken(
          token,
          options
        );
        response.userId = verificationResponse.payload?.sub ?? "unknown";
        response.valid = true;
        response.userTokenPayload = verificationResponse.payload;
      } else {
        await AuthController.verifyToken(
          { token, projectId, workspaceId, scopes: scopes ?? [], name: "" },
          SECRETS.config.secret
        );
        response.userId = "m2m";
        response.valid = true;
      }
    }
    return response;
  }
}
