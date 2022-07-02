import jsonata from 'jsonata'
import { FlowEnvironment } from '../types/flow.types'

export class EvaluationUtils {
  public static evaluate(filter: string, context: any): string | number {
    const evaluated = jsonata(filter).evaluate({ context })
    return evaluated
  }

  public static fromEnv(
    env: FlowEnvironment,
    type: string,
    key: string,
  ): string {
    let value: string | undefined
    switch (type) {
      case 'env':
        value = env.env[key]
        break
      case 'secrets':
        value = env.secrets[key]
        break
    }
    if (!value) {
      throw new Error(`No value for key <${type}.${key}>`)
    }
    return value
  }
}
