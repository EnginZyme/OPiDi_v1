import AWS from "aws-sdk";

/**
 * Sends log messages to a remote log stream
 * @param {String} message - The log message to be sent to the remote log stream
 * @param {String} aToken - The user's Google authentication token
 */
export function sendLogToLogStream(message, aToken) {
  AWS.config.credentials = new AWS.WebIdentityCredentials({
    RoleArn: "arn:aws:iam::957722357303:role/googleIdentity",
    WebIdentityToken: aToken,
  });
  const cloudwatchlogs = new AWS.CloudWatchLogs({
    apiVersion: "2014-03-28",
    region: "eu-north-1",
  });
  const currentDate = new Date();
  cloudwatchlogs.describeLogStreams(
    {
      logGroupName: "ProtocolDesignerSPA-test",
    },
    function(err, data_) {
      if (err) console.log(err, err.stack);
      // an error occurred
      else {
        let params = {
          logEvents: [
            {
              message,
              timestamp: currentDate.getTime(),
            },
          ],
          logGroupName: "ProtocolDesignerSPA-test",
          logStreamName: "UserActivity",
          sequenceToken: data_.logStreams[0].uploadSequenceToken,
        };
        cloudwatchlogs.putLogEvents(params, function(err) {
          if (err) console.log(err, err.stack);
        });
      }
    }
  );
}
