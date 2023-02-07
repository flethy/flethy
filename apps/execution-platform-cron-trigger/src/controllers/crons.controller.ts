import { read } from "worktop/kv";
import { FlethyProject, FlethyWorkspace } from "../types/general.type";
import { KVUtils } from "../utils/kv.utils";

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
  public static async getAll(env: any): Promise<CronResponse> {
    const foundCrons = await read<CronEntry[], CronMetadata>(
      KVUtils.getKV(env).data,
      KVUtils.getCronKey(),
      { metadata: true, type: "json" }
    );
    if (foundCrons?.value && foundCrons?.metadata) {
      return { value: foundCrons.value, metadata: foundCrons.metadata };
    } else {
      return { value: [], metadata: { count: 0, nextRun: 0 } };
    }
  }

  public static async getNextWorkflowsToExecute(env: any): Promise<Crons[]> {
    const foundCrons = await CronsController.getAll(env);
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
}
