'use strict'

var
	server = require('http').createServer(),
	express = require('express'),
	app = express(),
	parser = require('body-parser'),
	port = 3010,
	linebot = require(__dirname + '/public/javascripts/linebot');

//var Mysql = require(__dirname + '/public/javascripts/mysql');

//var mysql = new Mysql();

var ids = [];

app.use(express.static('app'));
app.use('/public', express.static(__dirname + '/public'));
app.use(parser.urlencoded({extended: true}));
app.use(parser.json());

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.get('/mysql/select/all/:database/:table', function(req, res){
	var database = req.params.database;
	var table = req.params.table;

	mysql.select(table, '*').then(function(data){
		res.send(data);
	});
});

app.get('/mysql/select/:column/:database/:table', function(req, res){
	var column = req.params.column;
	var database = req.params.database;
	var table = req.params.table;

	mysql.select(table, column).then(function(data){
		res.send(data);
	});
});

app.get('/send', function(req, res){
	/*
	mysql.select('test', '*'). then(function(rows){
		for(var row of rows)
			linebot.push(row.id, 'test');
	});
	*/

	for(var id of ids){
		linebot.push(id, true, 'test');
	}

	res.status(200);
	res.send('send');
});

app.post('/callback', function(req, res){
	var event = req.body.events[0];

	if(event.type === 'follow') ids.push(event.source.userId);
	else if(event.type === 'message'){
		linebot.reply(event.replyToken, 'message received');
		linebot.push(id[0], false, event.message.text);
	}

	res.status(200);
	res.send('received');
});

server.on('request', app);
server.listen((process.env.PORT || port), function(){
	console.log(`server running at port : ${server.address().port}`);
});
