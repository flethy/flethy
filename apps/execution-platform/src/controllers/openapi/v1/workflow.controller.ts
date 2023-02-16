import { FlowNode } from "@flethy/flow";
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
  Tags,
  OperationId,
} from "tsoa";
import { WorkflowController as RealWorkflowController } from "../../workflow.controller";

@Route("v1/w/:workspaceId/p/:projectId/wf")
@Tags("Workflows")
export class WorkflowController {
  /**
   * Add or update a workflow in a project
   *
   * @summary Add or update a workflow
   *
   * @param workspaceId The ID of the workspace the workflow belongs to
   * @param projectId The ID of the project the workflow belongs to
   * @param workflowId The ID of the workflow
   */
  @Security("bearer")
  @Put("/")
  @OperationId("AddOrUpdateWorkflow")
  @Response("400", "Bad Request")
  @Response("404", "Workflow not found")
  public static async put(
    @Path() workspaceId: string,
    @Path() projectId: string,
    @Inject() userId: string,
    @Body()
    body: {
      name: string;
      workflow: FlowNode[];
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

  /**
   * Get a workflow in a project
   *
   * @summary Get Workflow
   *
   * @param workspaceId The ID of the workspace the workflow belongs to
   * @param projectId The ID of the project the workflow belongs to
   * @param workflowId The ID of the workflow
   */
  @Security("bearer")
  @Get("/:workflowId")
  @OperationId("GetWorkflow")
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

  /**
   * List workflows in a project
   *
   * @summary List Workflows
   *
   * @param workspaceId The ID of the workspace the workflow belongs to
   * @param projectId The ID of the project the workflow belongs to
   */
  @Security("bearer")
  @Get("/")
  @OperationId("ListWorkflows")
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

  /**
   * Delete a workflow in a project
   *
   * @summary Delete Workflow
   *
   * @param workspaceId The ID of the workspace the workflow belongs to
   * @param projectId The ID of the project the workflow belongs to
   * @param workflowId The ID of the workflow
   */
  @Security("bearer")
  @Delete("/:workflowId")
  @OperationId("DeleteWorkflow")
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

  /**
   * Start instance for workflow
   *
   * @summary Start instance
   *
   * @param workspaceId The ID of the workspace the workflow belongs to
   * @param projectId The ID of the project the workflow belongs to
   * @param workflowId The ID of the workflow
   */
  @Security("bearer")
  @Post("/:workflowId/i")
  @OperationId("StartInstance")
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
