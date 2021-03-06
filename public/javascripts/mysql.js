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

	connect(this.connection);
}

function connect(c){
	var connection = c;

	connection.connect(function(err){
		if(err){                                    
			console.log('error :' + err);
		        setTimeout(connect(connection), 2000);
		}  

		console.log('connected');
	});

	connection.on('error', function(err){
		console.log('error: ' + err);
		if(err.code === 'PROTOCOL_CONNECTION_LOST'){
			connect(connection);
		}else throw err;
	});
}

Mysql.prototype.createTable = function(tableName){
	var connection = this.connection;

	connection.query(`create table ${tableName} (id varchar(50) not null, name varchar(20) not null, primary key(id))`);
};

Mysql.prototype.dropTable = function(tableName){
	var connection = this.connection;

	connection.query(`drop table ${tableName}`);
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
