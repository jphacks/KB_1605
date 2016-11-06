'use strict'

const mysql = require('mysql');

var Mysql = function(){
	this.connection = mysql.createConnection({
		host: 'us-cdbr-iron-east-04.cleardb.net',
		user: 'b82739e98ea7e3',
		password: '4ace0dfc',
		database: 'heroku_479150cb3f5723b'
//		host: 'localhost',
//		user: 'root',
//		database: 'test'
	});
}

function connect(){
	var connection = this.connection;

	connection.connect(function(err){
		if(err) throw err;

		console.log('connected');
	});

	connection.on('error', function(err){
		console.log('error: ' + err);
		if(err.code === 'PROTOCOL_CONNECTION_LOST'){
			connect();
		}else throw err;
	});
}

Mysql.prototype.createTable = function(familyName){
	var connection = this.connection;

	connection.query(`create table ${familyName} (id integer not null auto_increment, name varchar(20) not null, primary key(id))`);
};

Mysql.prototype.select = function(table, column){
	var connection = this.connection;

	return new Promise(function(resolve){
		connection.query(`select ${column} from ${table};`, function(err, rows, fields){
			if(err) throw err;

			resolve(rows);
		});
	});
};

Mysql.prototype.insert = function(table, column, value){
	var connection = this.connection;

	connection.query(`insert into ${table} (${column}) values ('${value}');`);
};
			
Mysql.prototype.end = function(){
	var connection = this.connection;

	connection.end();
	console.log('shut down');
};

module.exports = Mysql;
