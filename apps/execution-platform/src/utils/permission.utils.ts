import { ServerRequest } from "worktop/request";
import { ServerResponse } from "worktop/response";
import { SECRET } from "../constants/admin.const";
import { AuthController, TokenScope } from "../controllers/auth.controller";
import { ErrorType, FlethyError } from "./error.utils";

export class PermissionUtils {
  public static async permissions(
    req: ServerRequest,
    _res: ServerResponse,
    options: { scopes?: TokenScope[] }
  ) {
    const { scopes } = options;
    if (scopes) {
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
      const token = Authorization.replace("Bearer ", "");
      await AuthController.verifyToken(
        { token, projectId, workspaceId, scopes },
        SECRET
      );
    }
    return;
  }
}
