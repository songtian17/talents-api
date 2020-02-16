var AWS = require("aws-sdk");

AWS.config.loadFromPath("./awsconfig.json");

var docClient = new AWS.DynamoDB.DocumentClient();

export function getAccountIdFromToken(token: string) {
  return docClient.get(
    {
      TableName: "sessions",
      Key: { token: token }
    },
    (err, data) => {
      if (err) {
        console.error(
          "Unable to read item. Error JSON:",
          JSON.stringify(err, null, 2)
        );
        return undefined;
      }

      console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
      return data.accountId;
    }
  );
}
