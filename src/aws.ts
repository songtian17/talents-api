var AWS = require("aws-sdk");

AWS.config.loadFromPath("./awsconfig.json");

var docClient = new AWS.DynamoDB.DocumentClient();

export function getAccountIdFromToken(token: string) {
  return new Promise(function(resolve, reject) {
    if (!token) {
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
        resolve(JSON.parse(JSON.stringify(data)).Item.accountId);
      }
    );
  });
}
