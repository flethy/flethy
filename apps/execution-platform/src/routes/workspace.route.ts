import { ServerRequest } from "worktop/request";
import { ServerResponse } from "worktop/response";
import { WorkspaceController } from "../controllers/workspace.controller";
import { StatusCodeSuccess } from "../utils/router.utils";

export class WorkspacesRoute {
  public static async onboard(
    req: ServerRequest,
    res: ServerResponse,
    userId: string = ""
  ) {
    const body = await req.body<{
      name: string;
      projectName: string;
    }>();
    const response = await WorkspaceController.onboard({
      workspaceId: req.params.workspaceId,
      name: body?.name ?? "",
      project: {
        name: body?.projectName ?? "",
      },
      userId,
    });

    res.send(StatusCodeSuccess.OK, { ...response });
  }
}
