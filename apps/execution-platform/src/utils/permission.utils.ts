import { ServerRequest } from "worktop/request";
import { ServerResponse } from "worktop/response";
import { SECRET } from "../constants/admin.const";
import { AuthController, TokenScope } from "../controllers/auth.controller";
import { ErrorType, FlethyError } from "./error.utils";

export class PermissionUtils {
  public static async permissions(
    req: ServerRequest,
    _res: ServerResponse,
    options: { scopes: TokenScope[] }
  ) {
    const { scopes } = options;
    console.log(scopes);
    const Authorization = req.headers.get("Authorization");
    console.log(Authorization);
    const { projectId, workspaceId } = req.params;
    console.log({ projectId, workspaceId });
    if (!Authorization) {
      console.log(`no auth header`);
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
    return;
  }
}
