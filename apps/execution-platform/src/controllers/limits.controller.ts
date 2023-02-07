import { Limits, PACKAGE_LIMITS } from "../constants/limits.const";

export class LimitsController {
  public static getLimits(_options: { workspaceId: string }): Limits {
    return PACKAGE_LIMITS.base;
  }
}
