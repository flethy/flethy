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
}
