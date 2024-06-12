const { LoggerService } = require("./index");
const { TrackingUtil } = require("./util/TrackingUtil");

const loggerName = "[core]:resourceManagementHandler";
const methodName = "processResourceRequest";
const logLevel = process.env.LOGLEVEL || "DEBUG";

const loggerService = new LoggerService({
  name: loggerName,
  level: logLevel,
});

const event = {
  fieldName: "registerResource",
  arguments: {
    input: {
      resourceId: "20034276-8be2-45a5-99b1-12345example", // Generic resource ID
    },
  },
  identity: {
    sub: "28b007ac-aa2d-4b2a-9c64-223344example", // Generic user ID
    claims: { origin_jti: "aa2d-4b2a-9c64-223344example" },
  },
};

const tracker = TrackingUtil.getTracker({ customHeaders: event });

loggerService.setTracker(tracker);
loggerService.info(methodName, "Process overdue resource request", {
  arguments: event.arguments,
});

console.log(loggerService.isLogLevelEnabled("INFO"));
