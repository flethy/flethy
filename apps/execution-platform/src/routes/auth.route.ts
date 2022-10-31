import { ServerRequest } from "worktop/request";
import { ServerResponse } from "worktop/response";
import { SECRET } from "../constants/admin.const";
import { AuthController, TokenScope } from "../controllers/auth.controller";

export class AuthRoute {
  public static async createTokenRoute(
    _req: ServerRequest,
    res: ServerResponse
  ) {
    const token = await AuthController.createToken(
      {
        projectId: "123",
        workspaceId: "456",
        scopes: [TokenScope.WORKFLOW_CREATE, TokenScope.WORKFLOW_READ],
      },
      SECRET
    );

    res.send(200, { token });
  }
}
