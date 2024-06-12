import LoggerService from "./index";
import { TrackingUtil } from "./TrackingUtil";

const loggerName = "[admin-core-gql]:tenantManagementLambdaResolver";
const methodName = "getMyTrainingOverview";
const logLevel = process.env.LOGLEVEL ? process.env.LOGLEVEL : "DEBUG";

const loggerService = new LoggerService({
  name: loggerName,
  level: logLevel,
});

const event = {
  fieldName: "createTenant",
  arguments: {
    input: {
      tenantid: "31182165-9ae7-42c7-98b5-099da906b73b", 
    },
  },
  identity: {
    sub: "30c0153c-da08-4c7d-9e6f-fed7beac684a", 
    claims: { origin_jti: "da08-4c7d-9e6f-fed7beac684a" },
  },
};

const tracker = TrackingUtil.getTracker({ customHeaders: event });
loggerService.setTracker(tracker);
loggerService.info(methodName, "Send Overdue mail", {
  arguments: event.arguments,
});

console.log(loggerService.isLogLevelEnabled("INFO"));
