const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql");
const util = require("util");
const bcrypt = require("bcrypt");
const saltRounds = 10;
dotenv.config();
const server = express();
server.use(express.json());

const con = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

const query = util.promisify(con.query).bind(con);

server.get("/", (req, res) => {
  res.send("Welcome nodemon");
});

server.post("/users", async (req, res) => {
  try {
    const userPayload = req.body;
    const sql = `
            INSERT INTO test.Users (
                name,
                email,
                password,
                phone_country_code,
                phone,
                birth_date
            )
            VALUES(
                '${userPayload.name}',
                '${userPayload.email}',
                '${await bcrypt.hash(userPayload.password, saltRounds)}',
                ${userPayload.phoneCountryCode || "NULL"},
                ${userPayload.phone || "NULL"},
                ${userPayload.birthday ? `'${userPayload.birthday}'` : "NULL"});
        `;
    const result = await query(sql);
    res.json(result);
  } catch (error) {
    res.statusCode(500).json({
      message: "Ocurrió un error al insertar el usuario.",
      error,
    });
    return;
  }
});

server.listen(process.env.PORT || 7500);
console.log(
  `The server is running at http://localhost:${process.env.PORT || 7500}`
);
