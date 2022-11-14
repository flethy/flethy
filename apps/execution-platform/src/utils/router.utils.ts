import { Router } from "worktop";
import { Method, ServerRequest } from "worktop/request";
import { ServerResponse } from "worktop/response";
import { TokenScope } from "../controllers/auth.controller";
import { ErrorMiddleware } from "./error.utils";
import { PermissionUtils } from "./permission.utils";

export enum StatusCodeSuccess {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
}

export interface RouterOptions {
  API: Router;
  method: Method;
  route: string;
  scopes?: TokenScope[];
  isUserToken?: boolean;
  handler: (
    req: ServerRequest,
    res: ServerResponse,
    userId?: string
  ) => Promise<void>;
}

export class RouterUtils {
  public static createRoute(options: RouterOptions) {
    options.API.add(options.method, options.route, async (req, res) => {
      try {
        res.setHeader("Content-Type", "application/json");
        await PermissionUtils.permissions(req, res, {
          scopes: options.scopes,
          isUserToken: options.isUserToken,
        });
        await options.handler(req, res);
      } catch (error) {
        const response = ErrorMiddleware.handle(error);
        res.send(response.status, response.data);
      }
    });

    // options.API.add("OPTIONS", options.route, async (req, res) => {
    //   res.setHeader("Content-Type", "application/json");
    //   res.send(200);
    // });
  }
}

export class RouterPathUtils {
  private path: string[] = ["api"];

  constructor(version?: number) {
    if (version) {
      this.v(version);
    }
  }

  public v(version: number) {
    this.path.push(`v${version}`);
    return this;
  }

  public p() {
    this.path.push("p");
    this.path.push(":projectId");
    return this;
  }

  public w() {
    this.path.push("w");
    this.path.push(":workspaceId");
    return this;
  }

  public s() {
    this.path.push("s");
    return this;
  }

  public wf(withId: boolean = false) {
    this.path.push("wf");
    if (withId) {
      this.path.push(":workflowId");
    }
    return this;
  }

  public i(withId: boolean = false) {
    this.path.push("i");
    if (withId) {
      this.path.push(":instanceId");
    }
    return this;
  }

  public t() {
    this.path.push("token");
    return this;
  }

  public custom(custom: string) {
    this.path.push(custom);
    return this;
  }

  public gen(): string {
    return `/${this.path.join("/")}`;
  }
}
