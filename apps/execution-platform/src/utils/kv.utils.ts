import { KV } from "worktop/kv";

declare var WORKSPACES: KV.Namespace;

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

  public static getKV() {
    return { workspaces: WORKSPACES };
  }
}
