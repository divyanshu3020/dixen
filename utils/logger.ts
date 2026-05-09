type LogLevel = "INFO" | "WARN" | "ERROR" | "DEBUG";

class Logger {
  private context: string;

  constructor(context: string = "APP") {
    this.context = context.toUpperCase();
  }

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] [${this.context}] ${message}`;
  }

  info(message: string, ...args: any[]) {
    console.log(this.formatMessage("INFO", message), ...args);
  }

  warn(message: string, ...args: any[]) {
    console.warn(this.formatMessage("WARN", message), ...args);
  }

  error(message: string, ...args: any[]) {
    console.error(this.formatMessage("ERROR", message), ...args);
  }

  debug(message: string, ...args: any[]) {
    if (process.env.NODE_ENV !== "production") {
      console.log(this.formatMessage("DEBUG", message), ...args);
    }
  }

  static create(context: string): Logger {
    return new Logger(context);
  }
}

export const logger = new Logger();
export default Logger;
