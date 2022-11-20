import { Router } from "worktop";
import { TokenScope } from "../controllers/auth.controller";
import { RouterPathUtils, RouterUtils } from "../utils/router.utils";
import { SecretsRoute } from "./secrets.route";
import { WorkspacesRoute } from "./workspace.route";

export class FrontendRoute {
  public static addRoutes(API: Router) {
    RouterUtils.createRoute({
      API,
      method: "POST",
      route: new RouterPathUtils().w().custom("onboard").gen(),
      isUserToken: true,
      scopes: [TokenScope.WORKSPACE_CREATE],
      handler: async (req, res, userId, _response) => {
        await WorkspacesRoute.onboard(req, res, userId);
      },
    });

    // SECRETS

    RouterUtils.createRoute({
      API,
      method: "PUT",
      route: new RouterPathUtils().w().p().s().gen(),
      isUserToken: true,
      scopes: [TokenScope.SECRET_CREATE, TokenScope.SECRET_UPDATE],
      handler: async (req, res, userId) => {
        await SecretsRoute.put(req, res, userId);
      },
    });

    RouterUtils.createRoute({
      API,
      method: "GET",
      route: new RouterPathUtils().w().p().s().gen(),
      isUserToken: true,
      scopes: [TokenScope.SECRET_READ],
      handler: async (req, res, userId) => {
        await SecretsRoute.get(req, res, userId);
      },
    });

    RouterUtils.createRoute({
      API,
      method: "DELETE",
      route: new RouterPathUtils().w().p().s().gen(),
      isUserToken: true,
      scopes: [TokenScope.SECRET_DELETE],
      handler: async (req, res, userId) => {
        await SecretsRoute.del(req, res, userId);
      },
    });
  }
}
