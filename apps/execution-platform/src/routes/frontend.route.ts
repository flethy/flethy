import { Router } from "worktop";
import { TokenScope } from "../controllers/auth.controller";
import { RouterPathUtils, RouterUtils } from "../utils/router.utils";
import { SecretsRoute } from "./secrets.route";
import { TokensRoute } from "./tokens.route";
import { WorkflowsRoute } from "./workflows.route";
import { WorkspacesRoute } from "./workspace.route";

export class FrontendRoute {
  public static addRoutes(API: Router) {
    // WORKSPACES

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

    RouterUtils.createRoute({
      API,
      method: "GET",
      route: new RouterPathUtils().w(false).custom("my").gen(),
      isUserToken: true,
      scopes: [TokenScope.WORKSPACE_READ],
      handler: async (req, res, userId, response) => {
        await WorkspacesRoute.get(req, res, userId, response!);
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

    // TOKENS

    RouterUtils.createRoute({
      API,
      method: "POST",
      route: new RouterPathUtils().w().p().t().gen(),
      isUserToken: true,
      scopes: [TokenScope.TOKEN_CREATE],
      handler: async (req, res, userId) => {
        await TokensRoute.create(req, res, userId);
      },
    });

    RouterUtils.createRoute({
      API,
      method: "GET",
      route: new RouterPathUtils().w().p().t().gen(),
      isUserToken: true,
      scopes: [TokenScope.TOKEN_READ],
      handler: async (req, res, userId) => {
        await TokensRoute.get(req, res, userId);
      },
    });

    RouterUtils.createRoute({
      API,
      method: "DELETE",
      route: new RouterPathUtils().w().p().t(true).gen(),
      isUserToken: true,
      scopes: [TokenScope.TOKEN_DELETE],
      handler: async (req, res, userId) => {
        await TokensRoute.del(req, res, userId);
      },
    });

    // WORKFLOWS

    RouterUtils.createRoute({
      API,
      method: "PUT",
      route: new RouterPathUtils().w().p().wf().gen(),
      isUserToken: true,
      scopes: [TokenScope.WORKFLOW_CREATE],
      handler: async (req, res, userId) => {
        await WorkflowsRoute.put(req, res, userId);
      },
    });

    RouterUtils.createRoute({
      API,
      method: "GET",
      route: new RouterPathUtils().w().p().wf(true).gen(),
      isUserToken: true,
      scopes: [TokenScope.WORKFLOW_READ],
      handler: async (req, res, userId) => {
        await WorkflowsRoute.get(req, res, userId);
      },
    });

    RouterUtils.createRoute({
      API,
      method: "POST",
      route: new RouterPathUtils().w().p().wf(true).i().gen(),
      isUserToken: true,
      scopes: [TokenScope.INSTANCE_CREATE],
      handler: async (req, res, userId) => {
        await WorkflowsRoute.start(req, res, userId);
      },
    });

    RouterUtils.createRoute({
      API,
      method: "GET",
      route: new RouterPathUtils().w().p().wf().gen(),
      isUserToken: true,
      scopes: [TokenScope.WORKFLOW_READ],
      handler: async (req, res, userId) => {
        await WorkflowsRoute.list(req, res, userId);
      },
    });

    RouterUtils.createRoute({
      API,
      method: "DELETE",
      route: new RouterPathUtils().w().p().wf(true).gen(),
      isUserToken: true,
      scopes: [TokenScope.WORKFLOW_DELETE],
      handler: async (req, res, userId) => {
        await WorkflowsRoute.del(req, res, userId);
      },
    });
  }
}
