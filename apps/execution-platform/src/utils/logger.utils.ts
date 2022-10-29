export interface LogOptions {
  context: {
    origin: string;
    method: string;
  };
  message: string;
  data?: any;
}

interface LogOptionsWithLevel extends LogOptions {
  level: "info" | "warn" | "error";
}

class Logger {
  public log(options: LogOptionsWithLevel) {
    const message = `${options.level} >> ${options.context.origin} | ${options.context.method} | ${options.message}`;
    if (options.level === "error") {
      console.error(message);
    } else {
      console.log(message);
    }
    if (options.data) {
      console.log(options.data);
    }
  }

  public info(options: LogOptions) {
    this.log({ ...options, level: "info" });
  }

  public warn(options: LogOptions) {
    this.log({ ...options, level: "warn" });
  }

  public error(options: LogOptions) {
    this.log({ ...options, level: "error" });
  }
}

const logger = new Logger();
export default logger;
