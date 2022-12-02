import { ServerRequest } from "worktop/request";
import { ServerResponse } from "worktop/response";
import { WorkflowController } from "../controllers/workflow.controller";
import { StatusCodeSuccess } from "../utils/router.utils";

export class WorkflowsRoute {
  public static async put(
    req: ServerRequest,
    res: ServerResponse,
    userId: string = ""
  ) {
    const body = await req.body<{
      name: string;
      workflow: any;
      workflowId?: string;
    }>();
    const response = await WorkflowController.put({
      projectId: req.params.projectId,
      workspaceId: req.params.workspaceId,
      name: body?.name ?? "",
      workflowId: body?.workflowId,
      workflow: body?.workflow,
      userId,
    });

    res.send(StatusCodeSuccess.OK, { ...response });
  }

  public static async get(
    req: ServerRequest,
    res: ServerResponse,
    userId: string = ""
  ) {
    const data = await WorkflowController.get({
      projectId: req.params.projectId,
      workspaceId: req.params.workspaceId,
      workflowId: req.params.workflowId,
      userId,
    });

    res.send(StatusCodeSuccess.OK, {
      ...data?.metadata,
      workflow: data?.workflow.workflow,
      env: data?.workflow.env,
    });
  }

  public static async start(
    req: ServerRequest,
    res: ServerResponse,
    userId: string = ""
  ) {
    const body = await req.body<{
      payload: any;
    }>();
    const response = await WorkflowController.start({
      projectId: req.params.projectId,
      workspaceId: req.params.workspaceId,
      workflowId: req.params.workflowId,
      userId,
      payload: body?.payload,
    });

    res.send(StatusCodeSuccess.OK, {
      response,
    });
  }

  public static async list(
    req: ServerRequest,
    res: ServerResponse,
    userId: string = ""
  ) {
    const workflows = await WorkflowController.list({
      projectId: req.params.projectId,
      workspaceId: req.params.workspaceId,
      userId,
    });

    res.send(StatusCodeSuccess.OK, {
      data: workflows,
    });
  }

  public static async del(
    req: ServerRequest,
    res: ServerResponse,
    userId: string = ""
  ) {
    const success = await WorkflowController.delete({
      projectId: req.params.projectId,
      workspaceId: req.params.workspaceId,
      workflowId: req.params.workflowId,
      userId,
    });

    res.send(StatusCodeSuccess.OK, { success });
  }
}
