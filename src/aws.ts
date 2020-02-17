var AWS = require("aws-sdk");

AWS.config.loadFromPath("./awsconfig.json");

var docClient = new AWS.DynamoDB.DocumentClient();

export function getAccountIdFromToken(token: string) {
  return new Promise(function(resolve, reject) {
    if (!token || token === null) {
      reject("Invalid token");
    }
    docClient.get(
      {
        TableName: "sessions",
        Key: { token: token }
      },
      function(err, data) {
        if (err) {
          reject(JSON.parse(JSON.stringify(err)));
        }
        let dataObj = JSON.parse(JSON.stringify(data));
        try {
          resolve(dataObj.Item.accountId);
        } catch (err) {
          reject("Session not found");
        }
      }
    );
  });
}
