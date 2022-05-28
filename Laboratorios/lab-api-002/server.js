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
    delete userPayload.password;
    res.json({
      id: result.insertId,
      ...userPayload,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ocurrió un error al insertar el usuario.",
      error,
    });
    return;
  }
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

server.listen(process.env.PORT || 7500);
console.log(
  `The server is running at http://localhost:${process.env.PORT || 7500}`
);
