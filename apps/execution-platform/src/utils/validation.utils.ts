export interface ValidationOptions {
  value: any;
  parameter: string;
  checks: {
    required?: boolean;
    minStringLength?: number;
    numberGreaterEqualsThan?: number;
    arrayMinLength?: number;
  };
}

export interface ValidationResult {
  valid: boolean;
  message: string;
}

export class ValidationUtils {
  public static validateAll(options: ValidationOptions[]): ValidationResult {
    const result: ValidationResult = { valid: true, message: "" };

    for (const option of options) {
      const validationResult = this.validate(option);
      if (!validationResult.valid) {
        return validationResult;
      }
    }

    return result;
  }

  public static validate(options: ValidationOptions): ValidationResult {
    const result: ValidationResult = { valid: true, message: "" };

    if (
      options.checks.required &&
      !ValidationUtils.existisValue(options.value)
    ) {
      result.valid = false;
      result.message = `${options.parameter} is required`;
      return result;
    }

    if (ValidationUtils.existisValue(options.value)) {
      if (ValidationUtils.existisValue(options.checks.minStringLength)) {
        if (
          !ValidationUtils.valueType(options.value, "string") ||
          options.value.length < options.checks.minStringLength!
        ) {
          result.valid = false;
          result.message = `${options.parameter} must be at least ${options.checks.minStringLength} characters long`;
          return result;
        }
      }

      if (
        ValidationUtils.existisValue(options.checks.numberGreaterEqualsThan)
      ) {
        if (
          !ValidationUtils.valueType(options.value, "number") ||
          options.value.length < options.checks.numberGreaterEqualsThan!
        ) {
          result.valid = false;
          result.message = `${options.parameter} must be greater or equal than ${options.checks.numberGreaterEqualsThan}`;
          return result;
        }
      }

      if (ValidationUtils.existisValue(options.checks.arrayMinLength)) {
        if (
          !ValidationUtils.valueType(options.value, "array") ||
          options.value.length < options.checks.arrayMinLength!
        ) {
          result.valid = false;
          result.message = `${options.parameter} must have at least ${options.checks.arrayMinLength} items`;
          return result;
        }
      }
    }

    return result;
  }

  private static existisValue(value: any): boolean {
    return value !== undefined && value !== null;
  }

  private static valueType(
    value: any,
    type: "string" | "number" | "array"
  ): boolean {
    switch (type) {
      case "string":
      case "number":
        return typeof value === type;
      case "array":
        return Array.isArray(value);
      default:
        return false;
    }
  }
}
