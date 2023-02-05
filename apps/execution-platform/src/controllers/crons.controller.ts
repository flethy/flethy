import { read, write } from "worktop/kv";
import { ErrorType, FlethyError } from "../utils/error.utils";
import { KVUtils } from "../utils/kv.utils";
import { ValidationUtils } from "../utils/validation.utils";

// INTERFACES

export interface PutCronsRequest {
  crons: CronEntry[];
}

export interface RemoveCronRequest {
  projectId: string;
  workflowId: string;
}

export interface CronEntry {
  name: string;
  projectId: string;
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

export interface Crons {
  workflowIds: string[];
}

// CONTROLLER

export class CronsController {
  public static async get(): Promise<CronResponse> {
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

  public static async getNextWorkflowsToExecute(): Promise<Crons> {
    const foundCrons = await CronsController.get();
    const crons: Crons = { workflowIds: [] };
    const now = Date.now();
    if (foundCrons.metadata.count > 0 && foundCrons.metadata.nextRun < now) {
      crons.workflowIds = foundCrons.value
        .filter((cron) => cron.nextRun < now)
        .map((cron) => cron.workflowId);
    }
    return crons;
  }

  public static async put(request: PutCronsRequest) {
    const metadata: CronMetadata = {
      count: request.crons.length,
      nextRun: request.crons.reduce((min, cron) => {
        return cron.nextRun < min || min === 0 ? cron.nextRun : min;
      }, 0),
    };
    const success = await write<CronEntry[], CronMetadata>(
      KVUtils.getKV().data,
      KVUtils.getCronKey(),
      request.crons,
      { metadata }
    );

    return { success, metadata, value: request.crons };
  }

  public static async remove(request: RemoveCronRequest) {
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

    let currentCrons = await CronsController.get();
    if (!currentCrons) {
      currentCrons = { value: [], metadata: { count: 0, nextRun: 0 } };
    }
    currentCrons.value = currentCrons.value.filter(
      (currentCron) =>
        currentCron.projectId !== request.projectId &&
        currentCron.workflowId !== request.workflowId
    );

    const response = await CronsController.put({ crons: currentCrons.value });

    return response;
  }

  public static calculateNextRun(expression: string): number {
    return 0;
  }
}
