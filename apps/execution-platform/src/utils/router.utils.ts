import { Router } from "worktop";
import { Method, ServerRequest } from "worktop/request";
import { ServerResponse } from "worktop/response";
import { TokenScope } from "../controllers/auth.controller";
import { ErrorMiddleware } from "./error.utils";
import { PermissionUtils } from "./permission.utils";

export interface RouterOptions {
  API: Router;
  method: Method;
  route: string;
  scopes?: TokenScope[];
  handler: (req: ServerRequest, res: ServerResponse) => Promise<void>;
}

export class RouterUtils {
  public static createRoute(options: RouterOptions) {
    options.API.add(options.method, options.route, async (req, res) => {
      try {
        res.setHeader("Content-Type", "application/json");
        await PermissionUtils.permissions(req, res, {
          scopes: options.scopes,
        });
        await options.handler(req, res);
      } catch (error) {
        const response = ErrorMiddleware.handle(error);
        res.send(response.status, response.data);
      }
    });
  }
}
