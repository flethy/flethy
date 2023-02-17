import { getFutureMatches } from "@datasert/cronjs-matcher";
import { read, write } from "worktop/kv";
import { FlethyProject, FlethyWorkspace } from "../types/general.type";
import { ErrorType, FlethyError } from "../utils/error.utils";
import { KVUtils } from "../utils/kv.utils";
import { ValidationUtils } from "../utils/validation.utils";
import { AnalyticsEvent, FlethyFlowController } from "./flethyflow.controller";
import { LimitsController } from "./limits.controller";

// INTERFACES

export interface PutCronsRequest {
  crons: CronEntry[];
}

export interface RemoveCronRequest extends FlethyWorkspace, FlethyProject {
  cronId: string;
}

export interface GetCronRequest extends FlethyWorkspace, FlethyProject {}

export interface AddCronRequest extends FlethyWorkspace, FlethyProject {
  name: string;
  workflowId: string;
  expression: string;
}

export interface CronEntry extends FlethyWorkspace, FlethyProject {
  cronId: string;
  name: string;
  workflowId: string;
  expression: string;
  nextRun: number;
}

export interface CronMetadata {
  count: number;
  nextRun: number;
}

export interface CronResponse {
  metadata: CronMetadata;
  value: CronEntry[];
}

export interface Crons extends FlethyWorkspace, FlethyProject {
  workflowId: string;
}

// CONTROLLER

export class CronsController {
  public static async get(request: GetCronRequest): Promise<CronEntry[]> {
    const allCrons = await CronsController.getAll();
    const projectCrons = allCrons.value.filter(
      (cron) => cron.projectId === request.projectId
    );
    return projectCrons;
  }

  public static async getAll(): Promise<CronResponse> {
    const foundCrons = await read<CronEntry[], CronMetadata>(
      KVUtils.getKV().data,
      KVUtils.getCronKey(),
      { metadata: true, type: "json" }
    );
    if (foundCrons?.value && foundCrons?.metadata) {
      return { value: foundCrons.value, metadata: foundCrons.metadata };
    } else {
      return { value: [], metadata: { count: 0, nextRun: 0 } };
    }
  }

  public static async getNextWorkflowsToExecute(): Promise<Crons[]> {
    const foundCrons = await CronsController.getAll();
    let crons: Crons[] = [];
    const now = Date.now();
    if (foundCrons.metadata.count > 0 && foundCrons.metadata.nextRun < now) {
      crons = foundCrons.value
        .filter((cron) => cron.nextRun < now)
        .map((cron) => {
          return {
            workspaceId: cron.workspaceId,
            projectId: cron.projectId,
            workflowId: cron.workflowId,
          };
        });
    }
    return crons;
  }

  public static async put(request: PutCronsRequest) {
    const value: CronEntry[] = request.crons.map((cron) => {
      return {
        ...cron,
        nextRun: CronsController.calculateNextRun(cron.expression),
      };
    });
    const metadata: CronMetadata = {
      count: value.length,
      nextRun: value.reduce((min, cron) => {
        return cron.nextRun < min || min === 0 ? cron.nextRun : min;
      }, 0),
    };
    const success = await write<CronEntry[], CronMetadata>(
      KVUtils.getKV().data,
      KVUtils.getCronKey(),
      value,
      { metadata }
    );

    return { success, metadata, value };
  }

  public static async updateNextRuns() {
    const foundCrons = await CronsController.getAll();
    const updatedCrons = foundCrons.value.map((cron) => {
      return {
        ...cron,
        nextRun: CronsController.calculateNextRun(cron.expression),
      };
    });
    const metadata: CronMetadata = {
      count: updatedCrons.length,
      nextRun: updatedCrons.reduce((min, cron) => {
        return cron.nextRun < min || min === 0 ? cron.nextRun : min;
      }, 0),
    };
    const success = await write<CronEntry[], CronMetadata>(
      KVUtils.getKV().data,
      KVUtils.getCronKey(),
      updatedCrons,
      { metadata }
    );

    return { success, metadata, value: updatedCrons };
  }

  public static async add(request: AddCronRequest) {
    const validation = ValidationUtils.validateAll([
      {
        value: request.projectId,
        parameter: "projectId",
        checks: { required: true, minStringLength: 1 },
      },
      {
        value: request.workflowId,
        parameter: "workflowId",
        checks: { required: true, minStringLength: 1 },
      },
      {
        value: request.expression,
        parameter: "expression",
        checks: { required: true, minStringLength: 1, isCronExpression: true },
      },
    ]);
    if (!validation.valid) {
      throw new FlethyError({
        message: validation.message,
        type: ErrorType.BadRequest,
        log: {
          message: validation.message,
          context: { method: "add", origin: "crons.controller.ts" },
          data: { request },
        },
      });
    }

    let currentCrons = await CronsController.getAll();
    if (!currentCrons) {
      currentCrons = { value: [], metadata: { count: 0, nextRun: 0 } };
    }

    const projectCrons = currentCrons.value.filter(
      (cron) => cron.projectId === request.projectId
    );
    if (
      projectCrons.length >=
      LimitsController.getLimits({ workspaceId: request.workspaceId }).projects
        .crons.max
    ) {
      throw new FlethyError({
        message: `You have reached the maximum number of crons for this project`,
        type: ErrorType.Forbidden,
        log: {
          message: `You have reached the maximum number of crons for this project`,
          context: { method: "add", origin: "crons.controller.ts" },
          data: { request },
        },
      });
    }

    await FlethyFlowController.analytics({
      event: AnalyticsEvent.CRON_CREATE,
      projectId: request.projectId,
      workspaceId: request.workspaceId,
      userId: "unset",
    });

    const newCron: CronEntry = {
      cronId: crypto.randomUUID(),
      name: request.name,
      workflowId: request.workflowId,
      projectId: request.projectId,
      workspaceId: request.workspaceId,
      expression: request.expression,
      nextRun: 0,
    };

    currentCrons.value.push(newCron);

    const response = await CronsController.put({ crons: currentCrons.value });

    if (!response.success) {
      throw new FlethyError({
        message: `Failed to add cron ${request.name} to project ${newCron.projectId}`,
        type: ErrorType.Internal,
        log: {
          message: `Failed to add cron ${request.name} to project ${newCron.projectId}`,
          context: { method: "add", origin: "crons.controller.ts" },
          data: { request },
        },
      });
    }
    return newCron;
  }

  public static async remove(request: RemoveCronRequest) {
    const validation = ValidationUtils.validateAll([
      {
        value: request.cronId,
        parameter: "cronId",
        checks: { required: true, minStringLength: 1 },
      },
    ]);
    if (!validation.valid) {
      throw new FlethyError({
        message: validation.message,
        type: ErrorType.BadRequest,
        log: {
          message: validation.message,
          context: { method: "remove", origin: "crons.controller.ts" },
          data: { request },
        },
      });
    }

    let currentCrons = await CronsController.getAll();
    if (!currentCrons) {
      currentCrons = { value: [], metadata: { count: 0, nextRun: 0 } };
    }
    currentCrons.value = currentCrons.value.filter(
      (currentCron) => currentCron.cronId !== request.cronId
    );

    const response = await CronsController.put({ crons: currentCrons.value });

    await FlethyFlowController.analytics({
      event: AnalyticsEvent.CRON_DELETE,
      projectId: request.projectId,
      workspaceId: request.workspaceId,
      userId: "unset",
    });

    return response;
  }

  public static calculateNextRun(expression: string): number {
    const startAt = new Date().toISOString();
    const matchCount = 1;
    const nextRun = getFutureMatches(expression, { startAt, matchCount });
    if (nextRun.length === 0) {
      return 0;
    } else {
      return new Date(nextRun[0]).getTime();
    }
  }
}
