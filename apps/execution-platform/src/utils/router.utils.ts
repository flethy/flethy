import { Router } from "worktop";
import { Method, ServerRequest } from "worktop/request";
import { ServerResponse } from "worktop/response";
import { TokenScope } from "../controllers/auth.controller";
import { ErrorMiddleware } from "./error.utils";
import { PermissionsResponse, PermissionUtils } from "./permission.utils";

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
  isInterServiceToken?: boolean;
  handler: (
    req: ServerRequest,
    res: ServerResponse,
    userId: string,
    permissionsResponse?: PermissionsResponse
  ) => Promise<void>;
}

export class RouterUtils {
  public static createRoute(options: RouterOptions) {
    options.API.add(options.method, options.route, async (req, res) => {
      try {
        res.setHeader("Content-Type", "application/json");
        const response = await PermissionUtils.permissions(req, res, {
          scopes: options.scopes,
          isUserToken: options.isUserToken,
          isInterServiceToken: options.isInterServiceToken,
        });
        await options.handler(req, res, response.userId, response);
      } catch (error) {
        const response = ErrorMiddleware.handle(error);
        res.send(response.status, response.data);
      }
    });
  }
}

export class RouterPathUtils {
  private path: string[] = ["api"];

  constructor(version?: number) {
    if (version) {
      this.path = [];
      this.v(version);
    }
  }

  public v(version: number) {
    this.path.push(`v${version}`);
    return this;
  }

  public p(projectId?: string) {
    this.path.push("p");
    this.path.push(projectId ?? ":projectId");
    return this;
  }

  public w(workspaceId?: string | boolean) {
    this.path.push("w");
    if (typeof workspaceId === "boolean") {
      if (workspaceId === true) {
        this.path.push(":workspaceId");
      }
    } else {
      this.path.push(workspaceId ?? ":workspaceId");
    }
    return this;
  }

  public c(cronId?: string | boolean) {
    this.path.push("c");
    if (typeof cronId === "boolean") {
      if (cronId === true) {
        this.path.push(":cronId");
      }
    } else {
      this.path.push(cronId ?? ":cronId");
    }
    return this;
  }

  public s() {
    this.path.push("s");
    return this;
  }

  public s2s() {
    this.path.push("s2s");
    return this;
  }

  public wf(workflowId?: string | boolean) {
    this.path.push("wf");
    if (typeof workflowId === "boolean") {
      if (workflowId === true) {
        this.path.push(":workflowId");
      }
    } else {
      this.path.push(workflowId ?? ":workflowId");
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

  public t(withId: boolean = false) {
    this.path.push("token");
    if (withId) {
      this.path.push(":tokenId");
    }
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
