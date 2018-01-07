// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-west-2'});

// Create DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var params = {
  RequestItems: {
    'CUSTOMER_LIST': {
      Keys: [
        {'CUSTOMER_ID': {N: '005'},'CUSTOMER_NAME' : {S: 'Andy Owens'}},
        {'CUSTOMER_ID': {N: '006'},'CUSTOMER_NAME' : {S: 'Grim Reaper'}}
      ],
      ProjectionExpression: 'CUSTOMER_NAME'
    }
  }
};

ddb.batchGetItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    // console.log(data, 'data')
    data.Responses.CUSTOMER_LIST.forEach(function(element, index, array) {
      // console.log('something', array)
      console.log(element);
    });
  }
});
