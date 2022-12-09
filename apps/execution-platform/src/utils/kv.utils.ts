import { KV } from "worktop/kv";

declare var WORKSPACES: KV.Namespace;
declare var SECRETS: KV.Namespace;
declare var WORKFLOWS: KV.Namespace;

export interface KVNamespaces {
  workspaces: KV.Namespace;
  secrets: KV.Namespace;
  workflows: KV.Namespace;
}

export class KVUtils {
  public static secretsForProject(projectId: string): string {
    return `secrets-${projectId}`;
  }

  public static workflowKey(projectId: string, workflowId: string): string {
    return `${KVUtils.workflowKeyPrefix(projectId)}${workflowId}`;
  }

  public static workflowKeyPrefix(projectId: string): string {
    return `${projectId}:`;
  }

  public static workspaceKey(workspaceId: string): string {
    return `workspace-${workspaceId}`;
  }

  public static tokenKey(workspaceId: string, projectId: string): string {
    return `token-${workspaceId}-${projectId}`;
  }

  public static getKV(): KVNamespaces {
    return { workspaces: WORKSPACES, secrets: SECRETS, workflows: WORKFLOWS };
  }
}
