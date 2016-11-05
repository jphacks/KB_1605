'use strict'

const mysql = require('mysql');

var Mysql = function(database){
	this.connection = mysql.createConnection({
		host: 'us-cdbr-iron-east-04.cleardb.net',
		user: 'b82739e98ea7e3',
		password: '4ace0dfc',
		database: 'heroku_479150cb3f5723b'
	});

	this.connection.connect(function(err){
		if(err) throw err;

		console.log('connected');
	});
}

Mysql.prototype.select = function(table, column){
	var connection = this.connection;

	return new Promise(function(resolve){
		connection.query(`select ${column} from ${table};`, function(err, rows, fields){
			if(err) throw err;

			resolve(rows);

		});
	});
};

Mysql.prototype.end = function(){
	var connection = this.connection;

	connection.end();
	console.log('shut down');
};

module.exports = Mysql;
