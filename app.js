'use strict'

var
	server = require('http').createServer(),
	express = require('express'),
	app = express(),
	port = 3010;

var Mysql = require(__dirname + '/public/javascripts/mysql');

var mysql = {
	'test': new Mysql('test')
};

app.use(express.static('app'));
app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.get('/mysql/select/:database/:table', function(req, res){
	var database = req.params.database;
	var table = req.params.table;

	mysql[database].select(table).then(function(data){
		res.send(data);
	});
});

server.on('request', app);
server.listen(port, function(){
	console.log(`server running at port : ${port}`);
});
