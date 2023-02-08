import { Router } from "worktop";
import { RouterPathUtils, RouterUtils } from "../utils/router.utils";
import { CronsRoute } from "./crons.route";
import { WorkflowsRoute } from "./workflows.route";

export class ServiceRoute {
  public static addRoutes(API: Router) {
    RouterUtils.createRoute({
      API,
      method: "POST",
      route: new RouterPathUtils().s2s().w(true).p().wf(true).i().gen(),
      isInterServiceToken: true,
      handler: async (req, res, userId) => {
        await WorkflowsRoute.start(req, res, userId);
      },
    });

    RouterUtils.createRoute({
      API,
      method: "POST",
      route: new RouterPathUtils().s2s().c(false).custom("update").gen(),
      isInterServiceToken: true,
      handler: async (req, res, userId) => {
        await CronsRoute.updateNextRuns(req, res, userId);
      },
    });
  }
}
