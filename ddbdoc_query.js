// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-west-2'});

// Create DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var params = {
  ExpressionAttributeValues: {
    ':n' :  {S: 'Stuart Owens'},
    ':h': { S: "YES" },

   },
 KeyConditionExpression: 'CUSTOMER_NAME = :n and CUSTOMER_ID = :id',
 ProjectionExpression: 'CUSTOMER_NAME, AGE',
 FilterExpression: 'contains (HOUSE, :h)',
 TableName: 'CUSTOMER_LIST'
};

ddb.query(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log(data)
    data.Items.forEach(function(element, index, array) {
      console.log(element.CUSTOMER_NAME.S + " (" + element.AGE.N + ")");
    });
  }
});
