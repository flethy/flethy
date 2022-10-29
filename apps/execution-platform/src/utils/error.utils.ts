import logger, { LogOptions } from "./logger.utils";

export enum ErrorType {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  PreconditionFailed = 412,
  TooManyRequests = 429,
  Internal = 500,
  NotImplemented = 501,
  ServiceUnavailable = 503,
}

export interface ErrorOptions {
  type: ErrorType;
  message: string;
  log: LogOptions;
}

export interface ErrorResponse {
  status: number;
  data: {
    error: string;
  };
}

export const DEFAULT_MESSAGES = {
  400: "Bad request. And you should feel bad",
  401: "Please authorize at the door",
  403: "You are not supposed to be here",
  404: "This are not the droids you are looking for",
  409: "This does not compile",
  412: "Preconditions not met, yet",
  429: "Too many requests! You should rethink how often you call us!",
  500: "This should not happen, my bad",
  501: "We ship fast,m but not fast enough",
  503: "Please try again later",
};

export class FlethyError extends Error {
  public log: LogOptions;
  public type: ErrorType;

  constructor(options: ErrorOptions) {
    super(options.message);
    this.log = options.log;
    this.type = options.type;
  }
}

export class ErrorMiddleware {
  public static handle(error: any): ErrorResponse {
    const response: ErrorResponse = {
      status: ErrorType.Internal,
      data: {
        error: DEFAULT_MESSAGES[ErrorType.Internal],
      },
    };
    if (error.type) {
      response.status = error.type;
      response.data.error = error.message;
    }
    if (error.log) {
      logger.error(error.log);
    }
    return response;
  }
}
