import { Router } from "worktop";
import { TokenScope } from "../controllers/auth.controller";
import { RouterUtils } from "../utils/router.utils";
import { AuthRoute } from "./auth.route";

const API_PREFIX = "api";
const VERSION = "v1";

const R_PREFIX = `${API_PREFIX}/${VERSION}`;
const R_PROJECT = "p/:projectId";
const R_WORKSPACE = "w/:workspaceId";

export class Version1 {
  public static addRoutes(API: Router) {
    RouterUtils.createRoute({
      API,
      method: "GET",
      route: `${R_PREFIX}/${R_PROJECT}/${R_WORKSPACE}`,
      scopes: [TokenScope.WORKFLOW_READ],
      handler: async (_req, res) => {
        res.send(200, { nice: "nice" });
      },
    });

    RouterUtils.createRoute({
      API,
      method: "POST",
      route: `${R_PREFIX}/${R_PROJECT}/${R_WORKSPACE}/token`,
      handler: async (req, res) => {
        await AuthRoute.createTokenRoute(req, res);
      },
    });
  }
}
