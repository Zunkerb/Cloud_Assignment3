const Post = require("../models/post");
require('dotenv').config('../config/config.js');
const config = require('../config/config');
const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: config.get('dynamo.key'),
    secretAccessKey: config.get('dynamo.secret'),
    "region": 'us-west-2'
});
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});




const homeStartingContent =
	'The home pages lists all the blogs from all the users.';

const getPostId = async () => {
	const tableCoutParams = {
		TableName: config.get('dynamo.name'),
		Select: "COUNT",
	};
	let count = await ddb.scan(tableCoutParams).promise();
	console.log(count.ScannedCount);
	return count.ScannedCount;
	
}

const composePost = async (req, res) => {
	/* const post = new Post({
    username: req.user.username,
		title: req.body.postTitle,
		content: req.body.postBody
	});

	post.save();
	res.redirect('/post'); */

	let postCount = await getPostId();

	var params = {
		TableName: config.get('dynamo.name'),
		Item: {
		  'postId' : {S: postCount.toString()},
		  'username' : {S: req.user.username},
		  'title' : {S: req.body.postTitle}, 
		  'content' : {S: req.body.postBody} 
		}
	};
	
	ddb.putItem(params, function(err, data) {
	  if (err) {
		console.log("Error", err);
	  } else {
		console.log("Success", data);
	  }
	});

	res.redirect('/post');
};


const displayAllPosts = (req, res) => {
	/* Post.find({}, function(err, posts) {
		res.render('home', {
			startingContent: homeStartingContent,
			posts: posts
		});
	}); */

	const params = {
        TableName: config.get('dynamo.name'),
    };

	ddb.scan(params,function(err, posts) {
		res.render('home', {
			startingContent: homeStartingContent,
			posts: posts
		});
	  });

};
async function displayPost (req, res)  {
	const requestedPostId = req.params.postId;

	/* Post.findOne({ _id: requestedPostId }, function(err, post) {
		res.render('post', {
			title: post.title,
			content: post.content
		});
	}); */
};

module.exports = {
	displayAllPosts,
	displayPost,
    composePost
};