import * as jq from 'node-jq'

export class EvaluationUtils {
  public static async evaluate(
    filter: string,
    context: any,
  ): Promise<string | object> {
    const evaluated = await jq.run(filter, { context }, { input: 'json' })
    return evaluated
  }
}
