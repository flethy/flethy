import { Router } from "worktop";
import { TokenScope } from "../controllers/auth.controller";
import { RouterPathUtils, RouterUtils } from "../utils/router.utils";
import { WorkflowsRoute } from "./workflows.route";

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

    // WORKFLOWS

    RouterUtils.createRoute({
      API,
      method: "PUT",
      route: new RouterPathUtils(1).w().p().wf().gen(),
      handler: async (req, res, userId) => {
        await WorkflowsRoute.put(req, res, userId);
      },
    });

    RouterUtils.createRoute({
      API,
      method: "GET",
      route: new RouterPathUtils(1).w().p().wf(true).gen(),
      handler: async (req, res, userId) => {
        await WorkflowsRoute.get(req, res, userId);
      },
    });

    RouterUtils.createRoute({
      API,
      method: "POST",
      route: new RouterPathUtils(1).w().p().wf(true).i().gen(),
      handler: async (req, res, userId) => {
        await WorkflowsRoute.start(req, res, userId);
      },
    });

    RouterUtils.createRoute({
      API,
      method: "GET",
      route: new RouterPathUtils(1).w().p().wf().gen(),
      handler: async (req, res, userId) => {
        await WorkflowsRoute.list(req, res, userId);
      },
    });

    RouterUtils.createRoute({
      API,
      method: "DELETE",
      route: new RouterPathUtils(1).w().p().wf(true).gen(),
      handler: async (req, res, userId) => {
        await WorkflowsRoute.del(req, res, userId);
      },
    });
  }
}
