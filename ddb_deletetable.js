// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-west-2'});

// Create the DynamoDB service object
ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});

var params = {
  TableName: process.argv[2]
};

// Call DynamoDB to delete the specified table
ddb.deleteTable(params, function(err, data) {
  if (err && err.code === 'ResourceNotFoundException') {
    console.log("Error: Table not found");
  } else if (err && err.code === 'ResourceInUseException') {
    console.log("Error: Table in use");
  } else {
    console.log("Success", data);
  }
});
