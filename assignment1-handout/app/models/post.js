require('dotenv').config('../config/config.js');
const config = require('../config/config');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

/*
const mongoose = require("mongoose");
 const postSchema = new mongoose.Schema({
	username: {
		type: String,
		lowercase: true,
		required: [ true, "can't be blank" ],
		match: [ /^[a-zA-Z0-9]+$/, 'Invalid username' ],
		index: true,
		unique: true
	},
	title: { type: String, required: [ true, "can't be blank" ] },
	content: { type: String, required: [ true, "can't be blank" ] }
});

module.exports = mongoose.model("Post", postSchema); */

var params = {
	TableName: config.get('dynamo.name'),
	Item: {
	  'POST_ID' : {N: '001'}, //env var
	  'title' : {S: ''}, //figure out how to take input
	  'content' : {S: ''} // figure out how to take input
	}
  };

ddb.putItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});