var AWS = require("aws-sdk");

AWS.config.loadFromPath("./awsconfig.json");

var docClient = new AWS.DynamoDB.DocumentClient();

export function getAccountIdFromToken(token: string) {
  return new Promise(function(resolve, reject) {
    docClient.get(
      {
        TableName: "sessions",
        Key: { token: token }
      },
      function(err, data) {
        if (err) {
          console.error(
            "Unable to read item. Error JSON:",
            JSON.stringify(err, null, 2)
          );
          reject(err);
        }

        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
        resolve(JSON.parse(JSON.stringify(data)).Item.accountId);
      }
    );
  });
}
