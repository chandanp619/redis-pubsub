var express = require('express');
var router = express.Router();
var redis = require("redis");
router.get('/', function(req, res, next) {
  res.status(200).send({"Data":"API is Working!!!!"})
});

router.get('/server',function(req,res,next){
	
	try{
		var publisher = redis.createClient();
	
			publisher.publish("notification", "{'uid':'i458745iu474856u548uiruyt','message':'Booking Confirmed'}", function(){
 			//process.exit(0);
 			
 				return res.json({"data":"Message Sent"});
			});
	}catch(Exception){
		console.log(Exception);
	}
});

router.get('/client',function(req,res,next){
	var subscriber = redis.createClient();
	subscriber.subscribe("notification");
	subscriber.on("message", function (channel, message) {
		
 		var d = "Message: " + message + " on channel: " + channel + " is arrive!";
 		res.json({"data":d});
 		
	});
	
});

module.exports = router;