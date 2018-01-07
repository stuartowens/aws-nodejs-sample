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
            "CUSTOMER_ID": { "N": "001" },'CUSTOMER_NAME' : {S: 'Stuart Owens'},
            "DOG": { "S": "YES" },
            "CAT": { "S": "NO" },
            "AGE": { "N": "033" },
              "HOUSE": { "S": "NO" },
              "CAR": { "S": "NO" }
          }
        }
      },
       {
         PutRequest: {
           Item: {
             "CUSTOMER_ID": { "N": "002" },'CUSTOMER_NAME' : {S: 'Andy Owens'},
             "DOG": { "S": "YES" },
             "CAT": { "S": "YES" },
             "AGE": { "N": "083" },
               "HOUSE": { "S": "NO" },
               "CAR": { "S": "NO" }
           }
         }
       },
       {
         PutRequest: {
           Item: {
             "CUSTOMER_ID": { "N": "003" },'CUSTOMER_NAME' : {S: 'Grim Reaper'},
               "DOG": { "S": "NO" },
               "CAT": { "S": "NO" },
               "AGE": { "N": "013" },
               "HOUSE": { "S": "NO" },
               "CAR": { "S": "NO" }
           }
         }
       },
       {
         PutRequest: {
           Item: {
             "CUSTOMER_ID": { "N": "004" },
             'CUSTOMER_NAME' : {S: 'Cathy Alexander'},
               "DOG": { "S": "YES" },
               "CAT": { "S": "YES" },
               "AGE": { "N": "053" },
               "HOUSE": { "S": "NO" },
               "CAR": { "S": "NO" }
           }
         }
       },
       {
         PutRequest: {
           Item: {
             "CUSTOMER_ID": { "N": "005" },'CUSTOMER_NAME' : {S: 'Nancy Cardigan'},
               "DOG": { "S": "NO" },
               "CAT": { "S": "NO" },
               "HOUSE": { "S": "YES" },
               "AGE": { "N": "023" },
               "CAR": { "S": "NO" }
           }
         }
       },
       {
         PutRequest: {
           Item: {
             "CUSTOMER_ID": { "N": "006" },'CUSTOMER_NAME' : {S: 'Andy Orowitz'},
               "DOG": { "S": "YES" },
               "CAT": { "S": "NO" },
               "HOUSE": { "S": "NO" },
               "AGE": { "N": "043" },
               "CAR": { "S": "YES" }
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
