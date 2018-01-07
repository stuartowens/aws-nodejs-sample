// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-west-2'});

// Create the DynamoDB service object
ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});

var params = {
  TableName: 'CUSTOMER_LIST',
  Item: {
    'CUSTOMER_ID' : {N: '003'},
    'CUSTOMER_NAME' : {S: 'Cameron Owens'},
    "DOG": { "S": "YES" },
    "CAT": { "S": "NO" },
    "CAR": { "S": "NO" },
    "HOUSE": { "S": "NO" },
    "AGE" : {N: '025'}
  }
};

// Call DynamoDB to add the item to the table
ddb.putItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});
