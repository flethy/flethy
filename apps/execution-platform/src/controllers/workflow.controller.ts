import { KV, paginate, read, remove, write } from "worktop/kv";
import {
  FlethyMetaDates,
  FlethyMetaUser,
  FlethyProject,
  FlethyRequest,
} from "../types/general.type";
import { ErrorType, FlethyError } from "../utils/error.utils";
import { KVUtils } from "../utils/kv.utils";
import { ValidationUtils } from "../utils/validation.utils";

// KV NAMESPACE

declare var WORKFLOWS: KV.Namespace;

// INTERFACES

export interface FlethyWorkflow {
  workflow: any;
}

export interface FlethyWorkflowMetadata
  extends FlethyMetaDates,
    FlethyMetaUser,
    FlethyProject {
  workflowId: string;
  name: string;
}

export interface PutWorkflowRequest extends FlethyRequest {
  workflowId?: string;
  name: string;
  workflow: any;
}

export interface GetWorkflowRequest extends FlethyRequest {
  workflowId: string;
}

export interface DeleteWorkflowRequest extends FlethyRequest {
  workflowId: string;
}

export interface ListWorkflowsRequest extends FlethyRequest {
  limit?: number;
  page?: number;
}

// CONTROLLER

export class WorkflowController {
  public static async put(request: PutWorkflowRequest) {
    const validation = ValidationUtils.validateAll([
      {
        value: request.projectId,
        parameter: "projectId",
        checks: { minStringLength: 1 },
      },
      {
        value: request.workflow,
        parameter: "workflow",
        checks: { required: true },
      },
    ]);
    if (!validation.valid) {
      throw new FlethyError({
        message: validation.message,
        type: ErrorType.BadRequest,
        log: {
          message: validation.message,
          context: { method: "put", origin: "workflow.controller.ts" },
          data: { request },
        },
      });
    }

    const workflow: FlethyWorkflow = {
      workflow: request.workflow,
    };
    const workflowMetadata: FlethyWorkflowMetadata = {
      name: request.name,
      workflowId: request.workflowId ?? crypto.randomUUID(),
      projectId: request.projectId,
      createdAt: Date.now(),
      createdBy: request.userId,
    };
    if (request.workflowId) {
      const existingWorkflow = await WorkflowController.get({
        workspaceId: request.workspaceId,
        projectId: request.projectId,
        workflowId: request.workflowId,
        userId: request.userId,
      });
      if (!existingWorkflow) {
        throw new FlethyError({
          type: ErrorType.NotFound,
          message: `Workflow ${request.workflowId} not found`,
          log: {
            context: { origin: "workflow.controller.ts", method: "put" },
            message: `Workflow ${request.workflowId} not found`,
          },
        });
      }
      workflowMetadata.createdAt = existingWorkflow.metadata.createdAt;
      workflowMetadata.createdBy = existingWorkflow.metadata.createdBy;
      workflowMetadata.updatedAt = Date.now();
      workflowMetadata.updatedBy = request.userId;
    }

    const success = await write<FlethyWorkflow>(
      WORKFLOWS,
      KVUtils.workflowKey(
        workflowMetadata.projectId,
        workflowMetadata.workflowId
      ),
      workflow,
      { metadata: { name: request.name } }
    );
    return success;
  }

  public static async get(request: GetWorkflowRequest): Promise<{
    workflow: FlethyWorkflow;
    metadata: FlethyWorkflowMetadata;
  } | null> {
    const validation = ValidationUtils.validateAll([
      {
        value: request.projectId,
        parameter: "projectId",
        checks: { minStringLength: 1 },
      },
      {
        value: request.workflowId,
        parameter: "workflowId",
        checks: { minStringLength: 1 },
      },
    ]);
    if (!validation.valid) {
      throw new FlethyError({
        message: validation.message,
        type: ErrorType.BadRequest,
        log: {
          message: validation.message,
          context: { method: "get", origin: "workflow.controller.ts" },
          data: { request },
        },
      });
    }
    const { value, metadata } = await read<
      FlethyWorkflow,
      FlethyWorkflowMetadata
    >(WORKFLOWS, KVUtils.workflowKey(request.projectId, request.workflowId), {
      metadata: true,
      type: "json",
    });
    if (!value || !metadata) {
      return null;
    }
    return { workflow: value, metadata };
  }

  public static async list(request: ListWorkflowsRequest): Promise<string[]> {
    const validation = ValidationUtils.validateAll([
      {
        value: request.projectId,
        parameter: "projectId",
        checks: { minStringLength: 1 },
      },
    ]);
    if (!validation.valid) {
      throw new FlethyError({
        message: validation.message,
        type: ErrorType.BadRequest,
        log: {
          message: validation.message,
          context: { method: "list", origin: "workflow.controller.ts" },
          data: { request },
        },
      });
    }
    const foundWorkflowKeys = await paginate<string[]>(WORKFLOWS, {
      prefix: KVUtils.workflowKeyPrefix(request.projectId),
      limit: request.limit,
      page: request.page,
    });
    return foundWorkflowKeys || [];
  }

  public static async delete(request: DeleteWorkflowRequest): Promise<boolean> {
    const validation = ValidationUtils.validateAll([
      {
        value: request.projectId,
        parameter: "projectId",
        checks: { minStringLength: 1 },
      },
      {
        value: request.workflowId,
        parameter: "workflowId",
        checks: { minStringLength: 1 },
      },
    ]);
    if (!validation.valid) {
      throw new FlethyError({
        message: validation.message,
        type: ErrorType.BadRequest,
        log: {
          message: validation.message,
          context: { method: "delete", origin: "workflow.controller.ts" },
          data: { request },
        },
      });
    }
    const success = await remove(
      WORKFLOWS,
      KVUtils.workflowKey(request.projectId, request.workflowId)
    );
    return success;
  }
}
