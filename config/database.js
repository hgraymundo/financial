'use strict'

var mysql = require('mysql');
var env   = require('./enviroment')

var connection = mysql.createConnection({
  host: env.DATABASE_HOST,
  user: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME
});

module.exports=connection;
