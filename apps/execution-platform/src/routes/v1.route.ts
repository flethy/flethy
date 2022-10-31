import { Router } from "worktop";
import { TokenScope } from "../controllers/auth.controller";
import { ErrorMiddleware } from "../utils/error.utils";
import { PermissionUtils } from "../utils/permission.utils";

const API_PREFIX = "api";
const VERSION = "v1";

const R_PREFIX = `${API_PREFIX}/${VERSION}`;
const R_PROJECT = "p/:projectId";
const R_WORKSPACE = "w/:workspaceId";

export class Version1 {
  public static addRoutes(API: Router) {
    API.add(
      "GET",
      `/${R_PREFIX}/${R_PROJECT}/${R_WORKSPACE}`,
      async (req, res) => {
        try {
          await PermissionUtils.permissions(req, res, {
            scopes: [TokenScope.WORKFLOW_READ],
          });
        } catch (error) {
          const response = ErrorMiddleware.handle(error);
          res.send(response.status, response.data);
        }
      }
    );
  }
}
