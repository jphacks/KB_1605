'use strict'

var request = require('request');
var accessToken = 'PYx43JaDryJhsLiuRAb4sfrSbjs+WQl3woWROaYvR0Qi94PLiBacIFBo1/dzJ43MsZJuN2bGQ8ZbthKBKDy1hT2gqLR61qQE8D9mXDuA002PAgpm45VMymQW30mQuDFxxFFAYrhZ2xbyzc8oATVMIgdB04t89/1O/w1cDnyilFU=';

exports.send = function(req){
	var options = {
		url: 'https://api.line.me/v2/bot/message/push',
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
			'Authorization': `Bearer {${accessToken}}`
		},
		json: true,
		method: 'POST',
		body: {
			'to': req.events[0].source.userId,
			'messages':{
				'type': 'text',
				'text': 'test'
			}
		}
	};

	request.post(options, function(err, res, body){
		if(err) throw err;
		else if(res.statusCode === 200)
			console.log(body);
		else console.log('error: ' + JSON.stringify(res));
	});
};
