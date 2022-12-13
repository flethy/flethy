import {
  Body,
  Delete,
  Get,
  Inject,
  Path,
  Post,
  Put,
  Response,
  Route,
  Security,
} from "tsoa";
import { WorkflowController as RealWorkflowController } from "../../workflow.controller";

@Route("v1/w/:workspaceId/p/:projectId/wf")
export class WorkflowController {
  @Security("bearer")
  @Put("/")
  @Response("400", "Bad Request")
  @Response("404", "Workflow not found")
  public static async put(
    @Path() workspaceId: string,
    @Path() projectId: string,
    @Inject() userId: string,
    @Body()
    body: {
      name: string;
      workflow: any;
      workflowId?: string;
      env?: { [key: string]: string };
    }
  ) {
    return await RealWorkflowController.put({
      projectId,
      workspaceId,
      name: body.name,
      workflowId: body.workflowId,
      workflow: body.workflow,
      env: body.env,
      userId,
    });
  }

  @Security("bearer")
  @Get("/:workflowId")
  @Response("404", "Workflow not found")
  public static async get(
    @Path() workspaceId: string,
    @Path() projectId: string,
    @Path() workflowId: string,
    @Inject() userId: string
  ) {
    return await RealWorkflowController.get({
      projectId,
      workspaceId,
      workflowId,
      userId,
    });
  }

  @Security("bearer")
  @Get("/")
  public static async list(
    @Path() workspaceId: string,
    @Path() projectId: string,
    @Inject() userId: string
  ) {
    return await RealWorkflowController.list({
      projectId,
      workspaceId,
      userId,
    });
  }

  @Security("bearer")
  @Delete("/:workflowId")
  @Response("404", "Workflow not found")
  public static async delete(
    @Path() workspaceId: string,
    @Path() projectId: string,
    @Path() workflowId: string,
    @Inject() userId: string
  ) {
    return await RealWorkflowController.delete({
      projectId,
      workspaceId,
      workflowId,
      userId,
    });
  }

  @Security("bearer")
  @Post("/:workflowId/i")
  @Response("404", "Workflow not found")
  public static async start(
    @Path() workspaceId: string,
    @Path() projectId: string,
    @Path() workflowId: string,
    @Inject() userId: string,
    @Body()
    body: {
      payload?: any;
    }
  ) {
    return await RealWorkflowController.start({
      projectId,
      workspaceId,
      workflowId,
      userId,
      payload: body.payload,
    });
  }
}
