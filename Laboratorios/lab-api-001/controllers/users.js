const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendRecoveryCodeEmail } = require("../services/mailService");
const db = require("../models/index");
const saltRounds = 10;

exports.listUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "Ocurrió un error al recuperar los usuarios.",
      error
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const query = getQuery();
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
    const result = await query(sqlQuery);
    const sqlQuerySelect = `SELECT id, name, email, phone_country_code, phone, birthday, created_at, updated_at FROM test.Users WHERE id = ${result.insertId};`;
    const user = await query(sqlQuerySelect);
    res.json(user[0]);
  } catch (error) {
    res.status(500).json({
      message:
        "Ocurrió un error al crear el usuario. Intente nuevamente. Si el error persiste, contacte al administrador del sistema.",
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const query = getQuery();
    const userPayload = req.body;
    const sqlQuery = `SELECT * FROM test.Users WHERE email = '${userPayload.email}';`;
    const result = await query(sqlQuery);
    if (
      !result[0] ||
      !(await bcrypt.compare(userPayload.password, result[0].password))
    ) {
      res.status(401).send("Invalid credentials");
      return;
    }
    const user = result[0];

    const sqlQueryUserRoles = `SELECT * FROM test.Users_Roles WHERE id_usuario = '${user.id}';`;
    const roles = await query(sqlQueryUserRoles);

    const rolesIds = roles.map((r) => r.id_rol);

    delete user.password;
    const token = jwt.sign({ userId: user.id, roles: rolesIds }, process.env.JWT_KEY, {
      expiresIn: "10m"
    });
    res.json({
      ...user,
      token
    });
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};

exports.recoverPassword = async (req, res) => {
  try {
    const query = getQuery();
    const userPayload = req.body;
    const queryUserSQL = `SELECT id, email FROM test.Users WHERE email = '${userPayload.email}';`;
    const result = await query(queryUserSQL);
    if (!result[0]) {
      res.status(401).send("Datos no válidos");
      return;
    }
    const user = result[0];
    const randomToken = Math.floor(
      Math.random() * (999999 - 100000 + 1) + 100000
    );

    const deleteCodeSQL = `DELETE test.Confirmation_Codes WHERE id=${userCode.id};`;
    await query(deleteCodeSQL);

    const inertCodeSQL = `INSERT INTO test.Confirmation_Codes
        (id_usuario, code)
        VALUES(${user.id}, ${randomToken});`;

    await query(inertCodeSQL);

    await sendRecoveryCodeEmail(user.email, randomToken);

    res.status(204).send();
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const query = getQuery();
    const userPayload = req.body;
    const queryUserSQL = `SELECT u.id, cc.code
        FROM Confirmation_Codes cc 
          JOIN Users u 
            ON cc.id_usuario = u.id
        WHERE u.email = '${userPayload.email}';`;
    const result = await query(queryUserSQL);
    if (!result[0] || result[0].code !== userPayload.code) {
      res.status(401).send("Datos no válidos");
      return;
    }
    const userCode = result[0];

    const updatePasswordSQL = `UPDATE test.Users
        SET password='${await bcrypt.hash(userPayload.password, saltRounds)}'
        WHERE id=${userCode.id};`;
    await query(updatePasswordSQL);

    const deleteCodeSQL = `DELETE FROM test.Confirmation_Codes WHERE id_usuario=${userCode.id};`;
    await query(deleteCodeSQL);

    res.status(204).send();
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};
