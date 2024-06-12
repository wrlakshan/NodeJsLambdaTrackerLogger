const pino = require("pino");

const levelLabels = {
  10: "TRACE",
  20: "DEBUG",
  30: "INFO",
  40: "WARN",
  50: "ERROR",
  60: "FATAL",
};
2
class LoggerService {
  /**
   * Creates an instance of LoggerService.
   * This service provides a structured way to log messages.
   * @param {object} config Configuration for the logger.
   * @memberof LoggerService
   */
  constructor(config = {}) {
    this.logger = pino({
      level: config.level?.toLowerCase() || "info",
      name: config.name || "[default]",
      base: undefined,
      timestamp: false,
      // timestamp: () => `,"time":"${new Date().toISOString()}"`,
      formatters: {
        level(label, number) {
          return { level: levelLabels[number] };
        },
        log(object) {
          // If there's additional formatting you want to apply to every log message, do it here
          return object;
        },
      },
    });

    this.tracker = null;
  }

  /**
   * Sets the tracking information.
   * @param {object} tracker The tracking information object.
   */
  setTracker(tracker) {
    this.tracker = tracker;
  }

  /**
   * Gets the tracking information.
   * @returns {object} The tracking information.
   */
  getTracker() {
    return this.tracker;
  }

  /**
   * Logs a message at the specified level with additional information.
   * @param {string} level The log level.
   * @param {string} methodName The name of the method where the log is being called.
   * @param {string} message The message to log.
   * @param {object|Error} [details={}] Details or error instance to log.
   * @param {object} [additionalInfo={}] Additional information to log.
   */
  log(level, methodName, message, details = {}, additionalInfo = {}) {
    if (details instanceof Error) {
      const stackLines = details.stack ? details.stack.split("\n").map((line) => line.trim()) : [];
      details = {
        message: details.message,
        stack: stackLines,
      };
    }
    this.logger[level]({ ...this.tracker, methodName, details, additionalInfo }, message);
  }

  /**
   * Logs a trace message.
   * @param {string} methodName The name of the method where the log is being called.
   * @param {string} message The message to log.
   * @param {object} [details={}] Details to log.
   */
  trace(methodName, message, details = {}) {
    this.log("trace", methodName, message, details);
  }

  /**
   * Logs a debug message.
   * @param {string} methodName The name of the method where the log is being called.
   * @param {string} message The message to log.
   * @param {object} [details={}] Details to log.
   */
  debug(methodName, message, details = {}) {
    this.log("debug", methodName, message, details);
  }

  /**
   * Logs an info message.
   * @param {string} methodName The name of the method where the log is being called.
   * @param {string} message The message to log.
   * @param {object} [details={}] Details to log.
   */
  info(methodName, message, details = {}) {
    this.log("info", methodName, message, details);
  }

  /**
   * Logs a warn message.
   * @param {string} methodName The name of the method where the log is being called.
   * @param {string} message The message to log.
   * @param {object} [details={}] Details to log.
   */
  warn(methodName, message, details = {}) {
    this.log("warn", methodName, message, details);
  }

  /**
   * Logs an error message.
   * @param {string} methodName The name of the method where the log is being called.
   * @param {string} message The message to log.
   * @param {object|Error} [error={}] Details or error instance to log.
   * @param {object} [details={}] Additional information to log.
   */
  error(methodName, message, error = {}, details = {}) {
    this.log("error", methodName, message, error, details);
  }

  /**
   * Logs a fatal message.
   * @param {string} methodName The name of the method where the log is being called.
   * @param {string} message The message to log.
   * @param {object|Error} [error={}] Details or error instance to log.
   * @param {object} [details={}] Additional information to log.
   */
  fatal(methodName, message, error = {}, details = {}) {
    this.log("fatal", methodName, message, error, details);
  }

  /**
   * Checks if a log level is enabled.
   * @param {string} level The log level to check.
   * @returns {boolean} True if the log level is enabled, false otherwise.
   */
  isLogLevelEnabled(level) {
    return this.logger.isLevelEnabled(level.toLowerCase());
  }

  /**
   * Checks if debug level is enabled.
   * @returns {boolean} True if debug level is enabled, false otherwise.
   */
  isDebugEnabled() {
    return this.isLogLevelEnabled("debug");
  }
}

module.exports = LoggerService;
