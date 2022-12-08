import { ServerRequest } from "worktop/request";
import { ServerResponse } from "worktop/response";
import { SECRETS } from "../constants/envvar.const";
import { AuthController, TokenScope } from "../controllers/auth.controller";
import { TokenController } from "../controllers/token.controller";
import { StatusCodeSuccess } from "../utils/router.utils";

export class TokensRoute {
  public static async get(
    req: ServerRequest,
    res: ServerResponse,
    _userId: string = ""
  ) {
    const data = await TokenController.get({
      projectId: req.params.projectId,
      workspaceId: req.params.workspaceId,
    });

    res.send(StatusCodeSuccess.OK, { ...data });
  }

  public static async del(
    req: ServerRequest,
    res: ServerResponse,
    _userId: string = ""
  ) {
    const data = await TokenController.delete({
      projectId: req.params.projectId,
      workspaceId: req.params.workspaceId,
      tokenId: req.params.tokenId,
    });

    res.send(StatusCodeSuccess.OK, { ...data });
  }

  public static async create(
    req: ServerRequest,
    res: ServerResponse,
    _userId: string = ""
  ) {
    const body = await req.body<{ scopes: TokenScope[]; name: string }>();
    const data = await AuthController.createToken(
      {
        projectId: req.params.projectId,
        workspaceId: req.params.workspaceId,
        name: body?.name ?? "",
        scopes: body?.scopes ?? [],
      },
      SECRETS.config.secret
    );

    res.send(StatusCodeSuccess.OK, { ...data });
  }
}
