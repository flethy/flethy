import { Router } from "worktop";
import { TokenScope } from "../controllers/auth.controller";
import { RouterPathUtils, RouterUtils } from "../utils/router.utils";
import { WorkspacesRoute } from "./workspace.route";

export class FrontendRoute {
  public static addRoutes(API: Router) {
    RouterUtils.createRoute({
      API,
      method: "GET",
      route: new RouterPathUtils().custom("test").w().gen(),
      isUserToken: true,
      scopes: [TokenScope.WORKSPACE_READ],
      handler: async (_req, res, userId, response) => {
        res.send(200, { nice: "nice", user: userId, response });
      },
    });

    RouterUtils.createRoute({
      API,
      method: "POST",
      route: new RouterPathUtils().w().custom("onboard").gen(),
      isUserToken: true,
      scopes: [TokenScope.WORKSPACE_CREATE],
      handler: async (req, res, userId, response) => {
        await WorkspacesRoute.onboard(req, res, userId);
      },
    });
  }
}
