// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-west-2'});

// Create DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var params = {
 ExpressionAttributeValues: {
  ":h": {
    S: "NO"
   }
 },
 FilterExpression: "contains (HOUSE, :h)",
 ProjectionExpression: "CUSTOMER_NAME, AGE",
 TableName: "CUSTOMER_LIST"
};

ddb.scan(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log(data)
    data.Items.forEach(function(element, index, array) {
      console.log(element.CUSTOMER_NAME.S);
    });
  }
});
