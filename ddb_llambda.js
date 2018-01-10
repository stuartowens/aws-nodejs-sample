// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-west-2'});

exports.handler = (event, context, callback) => {

const URL_BASE = "https://s3-us-west-2.amazonaws.com/slotmachine1/ddb_llambda.html";
// define JSON used to format Lambda function response
var slotResults = {
  'isWinner' : false,
  'leftWheelImage' : {'file' : {S: ''}},
  'middleWheelImage' : {'file' : {S: ''}},
  'rightWheelImage' : {'file' : {S: ''}}
};

// define JSON for making getItem calls to the slotWheels DynamoDB table
var thisPullParams = {
    Key : {'slotPosition' : {N: ''}},
    TableName: 'slotWheels',
    ProjectionExpression: 'imageFile'
};

// create DynamoDB service object
var request = new AWS.DynamoDB({region: 'us-west-2', apiVersion: '2012-08-10'});

// set a random number 0-9 for the slot position
thisPullParams.Key.slotPosition.N = Math.floor(Math.random()*10).toString();
// call DynamoDB to retrieve the image to use for the Left slot result
var myLeftPromise = request.getItem(thisPullParams).promise().then(function(data) {return URL_BASE + data.Item.imageFile.S});

// set a random number 0-9 for the slot position
thisPullParams.Key.slotPosition.N = Math.floor(Math.random()*10).toString();
// call DynamoDB to retrieve the image to use for the Middle slot result
var myMiddlePromise = request.getItem(thisPullParams).promise().then(function(data) {return URL_BASE + data.Item.imageFile.S});

// set a random number 0-9 for the slot position
thisPullParams.Key.slotPosition.N = Math.floor(Math.random()*10).toString();
// call DynamoDB to retrieve the image to use for the Right slot result
var myRightPromise = request.getItem(thisPullParams).promise().then(function(data) {return URL_BASE + data.Item.imageFile.S});

Promise.all([myLeftPromise, myMiddlePromise, myRightPromise]).then(function(values) {
  // assign resolved promise values to returned JSON
  slotResults.leftWheelImage.file.S = values[0];
  slotResults.middleWheelImage.file.S = values[1];
  slotResults.rightWheelImage.file.S = values[2];
  // if all three values are identical, the spin is a winner
  if ((values[0] === values[1]) && (values[0] === values[2])) {
    slotResults.isWinner = true;
  }
  // return the JSON result to the caller of the Lambda function
  callback(null, slotResults);
});
}
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: 'us-east-2_LnHERhmWq'});
//
// var lambda = new AWS.Lambda({region: 'us-west-2', apiVersion: '2015-03-31'});
// // create JSON object for parameters for invoking Lambda function
// var pullParams = {
//   FunctionName : 'slotPull',
//   InvocationType : 'RequestResponse',
//   LogType : 'None'
// };
// // create variable to hold data returned by the Lambda function
// var pullResults;
//
// lambda.invoke(pullParams, function(error, data) {
//   if (error) {
//     prompt(error);
//   } else {
//     pullResults = JSON.parse(data.Payload);
//   }
// });
//
// // check results to see if this spin is a winner
// if (pullResults.isWinner) {
//   prompt("Winner!");
// }
