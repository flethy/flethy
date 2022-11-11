import { ServerRequest } from "worktop/request";
import { ServerResponse } from "worktop/response";
import { SecretsController } from "../controllers/secrets.controller";
import { StatusCodeSuccess } from "../utils/router.utils";

export class SecretsRoute {
  public static async put(
    req: ServerRequest,
    res: ServerResponse,
    userId: string = ""
  ) {
    const body = await req.body<{ key: string; value: string }>();
    const success = await SecretsController.put({
      projectId: req.params.projectId,
      workspaceId: req.params.workspaceId,
      key: body?.key ?? "",
      value: body?.value ?? "",
      userId,
    });

    res.send(StatusCodeSuccess.OK, { success });
  }

  public static async get(
    req: ServerRequest,
    res: ServerResponse,
    userId: string = ""
  ) {
    const data = await SecretsController.get({
      projectId: req.params.projectId,
      workspaceId: req.params.workspaceId,
      userId,
    });

    res.send(StatusCodeSuccess.OK, { ...data?.metadata });
  }

  public static async del(
    req: ServerRequest,
    res: ServerResponse,
    userId: string = ""
  ) {
    const body = await req.body<{ key: string }>();
    const success = await SecretsController.delete({
      projectId: req.params.projectId,
      workspaceId: req.params.workspaceId,
      userId,
      key: body?.key ?? "",
    });

    res.send(StatusCodeSuccess.OK, { success });
  }
}
