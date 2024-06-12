class TrackingUtil {
  /**
   * Extracts tracking information from the provided context.
   * @param {object} context The context object containing event, customHeaders, and message.
   * @returns {object} An object containing tracking details.
   */
  static getTracker(context) {
    const { event = null, customHeaders = null, message = null } = context;

    if (event) {
      return {
        userID: event?.identity?.sub,
        sessionID: event?.request?.headers?.sessionid ?? event?.identity?.claims?.origin_jti,
        actionID: event?.request?.headers?.actionid ?? event?.request?.headers?.["x-amzn-requestid"],
      };
    }

    if (customHeaders) {
      return {
        userID: customHeaders?.userID,
        sessionID: customHeaders?.sessionID,
        actionID: customHeaders?.actionID,
      };
    }

    if (message) {
      return {
        userID: message?.userID,
        sessionID: message?.sessionID,
        actionID: message?.actionID,
      };
    }

    return {};
  }
}

module.exports = { TrackingUtil };
