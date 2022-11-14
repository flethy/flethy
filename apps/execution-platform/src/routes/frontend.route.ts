import { Router } from "worktop";
import { RouterPathUtils, RouterUtils } from "../utils/router.utils";

export class FrontendRoute {
  public static addRoutes(API: Router) {
    RouterUtils.createRoute({
      API,
      method: "GET",
      route: new RouterPathUtils().custom("test").gen(),
      isUserToken: true,
      handler: async (_req, res) => {
        res.send(200, { nice: "nice" });
      },
    });
  }
}
