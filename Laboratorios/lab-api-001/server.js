const express = require("express");
const dotenv = require("dotenv");
const util = require('util');
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
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

const query = util.promisify(con.query).bind(con);

const mailTransporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
});

/**
    mailTransporter.sendMail({
      from: "ci0137@psgfanclubcr.com",
      to: "------",
      subject: "Message title",
      text: "Plaintext version of the message",
      html: "<p>HTML version of the message</p>"
    }, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
 */

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

server.post("/users/login", async (req, res) => {
  const userPayload = req.body;
  const sqlQuery = `SELECT * FROM test.Users WHERE email = '${userPayload.email}';`;
  try {
    const result = await query(sqlQuery);
    const passwordCheck = await bcrypt.compare(userPayload.password, result[0].password);
    if (!result || !passwordCheck) {
      res.status(401).send("Invalid credentials");
      return;
    }
    const user = result[0];
    delete user.password;
    res.json(user);
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
});

server.post("/users/recover-password", async (req, res) => {
  const userPayload = req.body;
  const queryUserSQL = `SELECT id, email FROM test.Users WHERE email = '${userPayload.email}';`;
  try {
    const result = await query(queryUserSQL);
    if (!result[0]) {
      res.status(401).send("Datos no válidos");
      return;
    }
    const user = result[0];
    const randomToken = Math.floor((Math.random() * (999999 - 100000 + 1)) + 100000);
    
    const inertCodeSQL = `INSERT INTO test.Confirmation_Codes
    (id_usuario, code)
    VALUES(${user.id}, ${randomToken});`

    await query(inertCodeSQL);

    mailTransporter.sendMail({
      from: "ci0137@psgfanclubcr.com",
      to: user.email,
      subject: "Su código de recuperación",
      text: `Utilice este código para recuperar su contraseña: ${randomToken}`,
      html: `Utilice este código para recuperar su contraseña: <strong>${randomToken}</strong>`
    }, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.statusCode(200);
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
});


server.patch("/users/reset-password", async (req, res) => {
  const userPayload = req.body;
  const queryUserSQL = `SELECT u.id, cc.code
  FROM Confirmation_Codes cc 
    JOIN Users u 
      ON cc.id_usuario = u.id
  WHERE u.email = '${userPayload.email}';`;
  try {
    const result = await query(queryUserSQL);
    if (!result[0] || result[0].code !== userPayload.code) {
      res.status(401).send("Datos no válidos");
      return;
    }
    const userCode = result[0];
    
    const updatePasswordSQL = `UPDATE test.Users
    SET password='${userPayload.password}'
    WHERE id=${userCode.id};`

    await query(updatePasswordSQL);

    res.statusCode(204);
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
});

server.listen(process.env.PORT || 8000);
console.log(
  `The server is listening on http://localhost:${process.env.PORT || 8000}`
);
