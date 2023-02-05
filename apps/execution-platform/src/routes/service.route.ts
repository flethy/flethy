import { Router } from "worktop";
import { RouterPathUtils, RouterUtils } from "../utils/router.utils";
import { WorkflowsRoute } from "./workflows.route";

export class ServiceRoute {
  public static addRoutes(API: Router) {
    RouterUtils.createRoute({
      API,
      method: "GET",
      route: new RouterPathUtils().s2s().w().p().wf(true).i().gen(),
      isInterServiceToken: true,
      handler: async (req, res, userId) => {
        await WorkflowsRoute.start(req, res, userId);
      },
    });
  }
}
