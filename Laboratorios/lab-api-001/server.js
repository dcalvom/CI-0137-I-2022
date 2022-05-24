const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;

dotenv.config();
const server = express();
server.use(express.json());

var con = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

server.get("/", (req, res) => {
  res.send("Welcome");
});

server.post("/users", async (req, res) => {
  const userPayload = req.body;
  const sqlQuery = `
    INSERT INTO test.Users
    (name, email, password, phone_country_code, phone, birthday)
    VALUES('${userPayload.name}',
      '${userPayload.email}',
      '${await bcrypt.hash(userPayload.password, saltRounds)}',
      ${userPayload.countryCode || "NULL"},
      ${userPayload.phone || "NULL"},
      ${`'${userPayload.birthday}'` || "NULL"}
    );`;
  con.query(sqlQuery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

server.post("/users/login", (req, res) => {
  const userPayload = req.body;
  const sqlQuery = `SELECT * FROM test.Users WHERE email = '${userPayload.email}';`;
  con.query(sqlQuery, async (err, result) => {
    if (err) {
      res.status(500).send("Server error: " + err);
      return;
    };
    const passwordCheck = await bcrypt.compare(userPayload.password, result[0].password);
    if (!result || !passwordCheck) {
      res.status(401).send("Invalid credentials");
      return;
    }
    const user = result[0];
    delete user.password;
    res.json(user);
  });
});

server.listen(process.env.PORT || 8000);
console.log(
  `The server is listening on http://localhost:${process.env.PORT || 8000}`
);
