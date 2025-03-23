/**
 * Logger utility with different logging levels
 * Used for consistent logging across the application
 */

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
  TRACE = 4,
}

type LoggerOptions = {
  /**
   * The minimum level to log (logs at this level and below will be shown)
   * Defaults to INFO in production, DEBUG in development
   */
  level?: LogLevel;
  
  /**
   * Whether to include timestamps in logs
   * Defaults to true
   */
  timestamp?: boolean;
  
  /**
   * Custom prefix for log messages
   */
  prefix?: string;
};

class Logger {
  private level: LogLevel;
  private timestamp: boolean;
  private prefix: string;
  
  constructor(options: LoggerOptions = {}) {
    // Set default log level based on environment
    this.level = options.level ?? 
      (process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG);
    this.timestamp = options.timestamp ?? true;
    this.prefix = options.prefix ?? '';
  }
  
  private formatMessage(level: string, message: string, ...args: any[]): string {
    const timestamp = this.timestamp ? `[${new Date().toISOString()}] ` : '';
    const prefix = this.prefix ? `[${this.prefix}] ` : '';
    const formattedMessage = `${timestamp}${prefix}[${level}] ${message}`;
    
    // Handle formatting with additional args
    if (args.length) {
      try {
        return args.reduce((msg, arg) => {
          if (typeof arg === 'object') {
            return `${msg} ${JSON.stringify(arg)}`;
          }
          return `${msg} ${String(arg)}`;
        }, formattedMessage);
      } catch (e) {
        return `${formattedMessage} [Error formatting log arguments]`;
      }
    }
    
    return formattedMessage;
  }
  
  /**
   * Log an error message
   */
  error(message: string, ...args: any[]): void {
    if (this.level >= LogLevel.ERROR) {
      console.error(this.formatMessage('ERROR', message, ...args));
    }
  }
  
  /**
   * Log a warning message
   */
  warn(message: string, ...args: any[]): void {
    if (this.level >= LogLevel.WARN) {
      console.warn(this.formatMessage('WARN', message, ...args));
    }
  }
  
  /**
   * Log an info message
   */
  info(message: string, ...args: any[]): void {
    if (this.level >= LogLevel.INFO) {
      console.info(this.formatMessage('INFO', message, ...args));
    }
  }
  
  /**
   * Log a debug message
   */
  debug(message: string, ...args: any[]): void {
    if (this.level >= LogLevel.DEBUG) {
      console.log(this.formatMessage('DEBUG', message, ...args));
    }
  }
  
  /**
   * Log a trace message
   */
  trace(message: string, ...args: any[]): void {
    if (this.level >= LogLevel.TRACE) {
      console.log(this.formatMessage('TRACE', message, ...args));
    }
  }
  
  /**
   * Create a child logger with a specific prefix
   */
  child(prefix: string): Logger {
    return new Logger({
      level: this.level,
      timestamp: this.timestamp,
      prefix: this.prefix ? `${this.prefix}:${prefix}` : prefix,
    });
  }
  
  /**
   * Set the log level
   */
  setLevel(level: LogLevel): void {
    this.level = level;
  }
}

// Create default logger instance
const defaultLogger = new Logger();

// Allow direct usage of logger functions
export const error = defaultLogger.error.bind(defaultLogger);
export const warn = defaultLogger.warn.bind(defaultLogger);
export const info = defaultLogger.info.bind(defaultLogger);
export const debug = defaultLogger.debug.bind(defaultLogger);
export const trace = defaultLogger.trace.bind(defaultLogger);

// Export a function to create new loggers
export function createLogger(options: LoggerOptions = {}): Logger {
  return new Logger(options);
}

export default defaultLogger; 