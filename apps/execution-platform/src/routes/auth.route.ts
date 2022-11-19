import { ServerRequest } from "worktop/request";
import { ServerResponse } from "worktop/response";
import { ENVVARS } from "../constants/envvar.const";
import { AuthController, TokenScope } from "../controllers/auth.controller";
import { StatusCodeSuccess } from "../utils/router.utils";

export class AuthRoute {
  public static async createTokenRoute(
    req: ServerRequest,
    res: ServerResponse
  ) {
    const body = await req.body<{ scopes: TokenScope[] }>();
    const token = await AuthController.createToken(
      {
        projectId: req.params.projectId,
        workspaceId: req.params.workspaceId,
        scopes: body?.scopes,
      },
      ENVVARS.config.stage
    );

    res.send(StatusCodeSuccess.OK, { token });
  }
}
