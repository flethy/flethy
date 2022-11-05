export class KVUtils {
  public static secretsForProject(projectId: string): string {
    return `secrets-${projectId}`;
  }
}
