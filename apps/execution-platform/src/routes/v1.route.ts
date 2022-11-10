import { Router } from "worktop";
import { TokenScope } from "../controllers/auth.controller";
import { RouterPathUtils, RouterUtils } from "../utils/router.utils";
import { AuthRoute } from "./auth.route";
import { SecretsRoute } from "./secrets.route";

export class Version1 {
  public static addRoutes(API: Router) {
    RouterUtils.createRoute({
      API,
      method: "GET",
      route: new RouterPathUtils(1).w().p().gen(),
      scopes: [TokenScope.WORKFLOW_READ],
      handler: async (_req, res) => {
        res.send(200, { nice: "nice" });
      },
    });

    RouterUtils.createRoute({
      API,
      method: "POST",
      route: new RouterPathUtils(1).w().p().t().gen(),
      handler: async (req, res) => {
        await AuthRoute.createTokenRoute(req, res);
      },
    });

    RouterUtils.createRoute({
      API,
      method: "PUT",
      route: new RouterPathUtils(1).w().p().s().gen(),
      handler: async (req, res) => {
        await SecretsRoute.put(req, res);
      },
    });

    RouterUtils.createRoute({
      API,
      method: "GET",
      route: new RouterPathUtils(1).w().p().s().gen(),
      handler: async (req, res) => {
        await SecretsRoute.get(req, res);
      },
    });
  }
}
