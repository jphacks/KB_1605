'use strict'

var request = require('request');
var accessToken = 'PYx43JaDryJhsLiuRAb4sfrSbjs+WQl3woWROaYvR0Qi94PLiBacIFBo1/dzJ43MsZJuN2bGQ8ZbthKBKDy1hT2gqLR61qQE8D9mXDuA002PAgpm45VMymQW30mQuDFxxFFAYrhZ2xbyzc8oATVMIgdB04t89/1O/w1cDnyilFU=';

exports.push = function(userId, text){
	var options = {
		method: 'POST',
		url: 'https://api.line.me/v2/bot/message/push',
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
			'Authorization': `Bearer {${accessToken}}`
		},
		json: true,
		body: {
			'to': userId,
			'messages': [{
				'type': 'image',
				'originalContentUrl': '/public/images/test.jpg',
				'previewImageUrl': '/public/images/test_p.jpg'
			}]
		}
	};

	request.post(options, function(err, res, body){
		if(err) throw err;
		else if(res.statusCode === 200)
			console.log(body);
		else console.log('error: ' + JSON.stringify(res));
	});
};

exports.reply = function(replyToken, message){
	var options = {
		method: 'POST',
		url: 'https://api.line.me/v2/bot/message/reply',
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
			'Authorization': `Bearer {${accessToken}}`
		},
		json: true,
		body: {
			'replyToken': replyToken,
			'messages': [{
				'type': 'text',
				'text': message
			}]
		}
	};

	request.post(options, function(err, res, body){
		if(err) throw err;
		else if(res.statusCode === 200) console.log(body);
		else console.log('error: ' + JSON.stringify(res));
	});
};
