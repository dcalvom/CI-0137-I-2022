const util = require("util");
const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

let databaseConnection;
let query;

exports.connect = () => {
  if (!databaseConnection || !query) {
    databaseConnection = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
    databaseConnection.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
      query = util.promisify(databaseConnection.query).bind(databaseConnection);
    });
  }
};

exports.getQuery = () => {
  return query;
}
