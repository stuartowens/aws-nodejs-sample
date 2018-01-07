// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-west-2'});

// Create DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var params = {
  RequestItems: {
    "CUSTOMER_LIST": [
       {
         PutRequest: {
           Item: {
             "CUSTOMER_ID": { "N": "005" },'CUSTOMER_NAME' : {S: 'Andy Owens'},
             "DOG": { "S": "YES" },
             "CAT": { "S": "YES" },
               "HOUSE": { "S": "NO" },
               "CAR": { "S": "NO" }
           }
         }
       },
       {
         PutRequest: {
           Item: {
             "CUSTOMER_ID": { "N": "006" },'CUSTOMER_NAME' : {S: 'Grim Reaper'},
               "DOG": { "S": "NO" },
               "CAT": { "S": "NO" },
               "HOUSE": { "S": "NO" },
               "CAR": { "S": "NO" }
           }
         }
       }
    ]
  }
};

ddb.batchWriteItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});
