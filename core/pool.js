const util = require('util');
const mysql = require('mysql');

// connection to the database
var config = {
    host: 'gad-cn-authentication.mysql.database.azure.com',
    user: "gadCNAdmin@gad-cn-authentication",
    password: "3Hn!X0ry$Z!2G7eC",
    database: "quickstartdb",
    port:3306,
    ssl: true
};

const conn = mysql.createConnection(config);

conn.connect(
	function (err) { 
	if (err) { 
		console.error("Something went wrong connecting to the database ...");
		throw err;
	}
	else
	{
	   console.log("Connection established.");
    }
    return;
});

conn.query = util.promisify(conn.query);

module.exports = conn;