import { ServerRequest } from "worktop/request";
import { ServerResponse } from "worktop/response";
import { SECRET } from "../constants/admin.const";
import { AuthController, TokenScope } from "../controllers/auth.controller";

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
      SECRET
    );

    res.send(200, { token });
  }
}
