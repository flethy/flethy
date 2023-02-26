import { read, write } from "worktop/kv";
import { Limits } from "../constants/limits.const";
import { FlethyMetaDates, FlethyMetaUser } from "../types/general.type";
import { ErrorType, FlethyError } from "../utils/error.utils";
import { KVUtils } from "../utils/kv.utils";
import { ValidationUtils } from "../utils/validation.utils";
import { ProjectRole, WorkspaceRole } from "./auth.controller";
import { AnalyticsEvent, FlethyFlowController } from "./flethyflow.controller";
import { LimitsController } from "./limits.controller";

// INTERFACES

export interface Project {
  id: string;
  name?: string;
  r: ProjectRole[];
}

export interface Workspace {
  id: string;
  name?: string;
  r: WorkspaceRole[];
  p: Project[];
  limits?: Limits;
}

export interface FlethyWorkspaceMetadata
  extends FlethyMetaDates,
    FlethyMetaUser {
  workspaceId: string;
  name: string;
}

export interface OnboardWorkspaceRequest {
  workspaceId: string;
  name: string;
  project: {
    name: string;
  };
  userId: string;
}

export interface GetWorkspacesRequest {
  workspaceIds: string[];
  projectIds: string[];
}

// CONTROLLER

export class WorkspaceController {
  public static async onboard(request: OnboardWorkspaceRequest) {
    const validation = ValidationUtils.validateAll([
      {
        value: request.userId,
        parameter: "userId",
        checks: { required: true, minStringLength: 1 },
      },
      {
        value: request.workspaceId,
        parameter: "workspaceId",
        checks: { required: true, minStringLength: 1 },
      },
      {
        value: request.name,
        parameter: "name",
        checks: { required: true, minStringLength: 1 },
      },
      {
        value: request.project?.name,
        parameter: "project.name",
        checks: { required: true, minStringLength: 1 },
      },
    ]);
    if (!validation.valid) {
      throw new FlethyError({
        message: validation.message,
        type: ErrorType.BadRequest,
        log: {
          message: validation.message,
          context: { method: "onboard", origin: "workspace.controller.ts" },
          data: { request },
        },
      });
    }

    const projectId = crypto.randomUUID();

    const workspaceMetadata: FlethyWorkspaceMetadata = {
      workspaceId: request.workspaceId,
      name: request.name,
      createdAt: Date.now(),
      createdBy: request.userId,
    };
    const workspace: Workspace = {
      id: request.workspaceId,
      name: request.name,
      r: [WorkspaceRole.OWNER],
      p: [
        {
          id: projectId,
          r: [ProjectRole.OWNER],
          name: request.project.name,
        },
      ],
    };

    const success = await write<Workspace>(
      KVUtils.getKV().workspaces,
      KVUtils.workspaceKey(workspaceMetadata.workspaceId),
      workspace,
      { metadata: { ...workspaceMetadata } }
    );

    if (success) {
      await FlethyFlowController.onboardUser({
        userId: request.userId,
        workspace,
      });
      await FlethyFlowController.sendEvent({
        event: AnalyticsEvent.USER_ONBOARD,
        userId: request.userId,
        workspaceId: request.workspaceId,
        projectId,
      });
    }

    return { success, workspaceMetadata };
  }

  public static async get(request: GetWorkspacesRequest) {
    const validation = ValidationUtils.validateAll([
      {
        value: request.workspaceIds,
        parameter: "workspaceIds",
        checks: { required: true, arrayMinLength: 1 },
      },
      {
        value: request.projectIds,
        parameter: "projectIds",
        checks: { required: true, arrayMinLength: 1 },
      },
    ]);
    if (!validation.valid) {
      throw new FlethyError({
        message: validation.message,
        type: ErrorType.BadRequest,
        log: {
          message: validation.message,
          context: { method: "get", origin: "workspace.controller.ts" },
          data: { request },
        },
      });
    }

    const promises = request.workspaceIds.map((workspaceId) => {
      return read<Workspace, FlethyWorkspaceMetadata>(
        KVUtils.getKV().workspaces,
        KVUtils.workspaceKey(workspaceId),
        { metadata: true, type: "json" }
      );
    });

    const responses = await Promise.all(promises);

    const workspaces = responses.map((response) => {
      return response.value;
    });

    for (const workspace of workspaces) {
      if (workspace) {
        workspace.p = workspace.p.filter((project) =>
          request.projectIds.includes(project.id)
        );
        workspace.limits = LimitsController.getLimits({
          workspaceId: workspace.id,
        });
      }
    }

    return { workspaces };
  }
}
