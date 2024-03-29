import { ServerRequest } from "worktop/request";
import { ServerResponse } from "worktop/response";
import { CronsController } from "../controllers/crons.controller";
import { StatusCodeSuccess } from "../utils/router.utils";

export class CronsRoute {
  public static async get(
    req: ServerRequest,
    res: ServerResponse,
    _userId: string = ""
  ) {
    const data = await CronsController.get({
      projectId: req.params.projectId,
      workspaceId: req.params.workspaceId,
    });

    res.send(StatusCodeSuccess.OK, data);
  }

  public static async getAll(
    req: ServerRequest,
    res: ServerResponse,
    _userId: string = ""
  ) {
    const data = await CronsController.getAll();

    res.send(StatusCodeSuccess.OK, { ...data });
  }

  public static async del(
    req: ServerRequest,
    res: ServerResponse,
    _userId: string = ""
  ) {
    const data = await CronsController.remove({
      projectId: req.params.projectId,
      workspaceId: req.params.workspaceId,
      cronId: req.params.cronId,
    });

    res.send(StatusCodeSuccess.OK, {});
  }

  public static async create(
    req: ServerRequest,
    res: ServerResponse,
    _userId: string = ""
  ) {
    const body = await req.body<{
      name: string;
      workflowId: string;
      expression: string;
    }>();
    const data = await CronsController.add({
      projectId: req.params.projectId,
      workspaceId: req.params.workspaceId,
      name: body?.name ?? "",
      expression: body?.expression ?? "",
      workflowId: body?.workflowId ?? "",
    });

    res.send(StatusCodeSuccess.OK, { ...data });
  }

  public static async updateNextRuns(
    _req: ServerRequest,
    res: ServerResponse,
    _userId: string = ""
  ) {
    const data = await CronsController.updateNextRuns();
    res.send(StatusCodeSuccess.OK, { ...data });
  }
}
