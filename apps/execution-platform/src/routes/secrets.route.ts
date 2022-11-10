import { ServerRequest } from "worktop/request";
import { ServerResponse } from "worktop/response";
import { SecretsController } from "../controllers/secrets.controller";

export class SecretsRoute {
  public static async put(req: ServerRequest, res: ServerResponse) {
    const body = await req.body<{ key: string; value: string }>();
    const success = await SecretsController.put({
      projectId: req.params.projectId,
      workspaceId: req.params.workspaceId,
      key: body?.key ?? "",
      value: body?.value ?? "",
      userId: "",
    });

    res.send(200, { success });
  }

  public static async get(req: ServerRequest, res: ServerResponse) {
    const data = await SecretsController.get({
      projectId: req.params.projectId,
      workspaceId: req.params.workspaceId,
      userId: "",
    });

    res.send(200, { ...data?.metadata });
  }
}
