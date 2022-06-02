const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendRecoveryCodeEmail } = require("../services/mailService");
const db = require("../models/index");

const saltRounds = 10;

exports.createUser = async (req, res) => {
  try {
    const query = getQuery();
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
                    ${
                      userPayload.birthday
                        ? `'${userPayload.birthday}'`
                        : "NULL"
                    });
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
};

exports.loginUser = async (req, res) => {
  try {
    const query = getQuery();
    const userPayload = req.body;
    const sqlQuery = `SELECT * FROM test.Users WHERE email = '${userPayload.email}';`;
    const result = await query(sqlQuery);
    const passwordCheck = await bcrypt.compare(
      userPayload.password,
      result[0].password
    );
    if (!result[0] || !passwordCheck) {
      res.status(401).send("Invalid credentials");
      return;
    }
    const user = result[0];
    delete user.password;

    const sqlQueryRoles = `SELECT * FROM test.Users_Roles WHERE user_id = '${user.id}';`;
    const resultRoles = await query(sqlQueryRoles);
    const rolesIds = resultRoles.map((r) => r.role_id);

    const token = jwt.sign({ userId: user.id, roles: rolesIds }, process.env.JWT_KEY, {
      expiresIn: "5m"
    });
    user.token = token;
    res.json(user);
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

    const deleteCodeSQL = `DELETE FROM test.Users_Recovery_Codes WHERE user_id=${user.id};`;
    await query(deleteCodeSQL);

    const nowDate = new Date();
    const expirationDate = new Date(
      nowDate.setMinutes(nowDate.getMinutes() + 15)
    ).toISOString();

    console.log(
      expirationDate.replace("T", " ").substring(0, expirationDate.indexOf("."))
    );

    const inertCodeSQL = `INSERT INTO test.Users_Recovery_Codes
        (user_id, code, expiration_date)
        VALUES(${user.id}, ${randomToken}, '${expirationDate
      .replace("T", " ")
      .substring(0, expirationDate.indexOf("."))}');`;

    await query(inertCodeSQL);

    await sendRecoveryCodeEmail(user.email, randomToken);

    res.status(200).send();
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const query = getQuery();
    const userPayload = req.body;
    const queryUserSQL = `SELECT u.id, urc.code, urc.expiration_date
        FROM Users_Recovery_Codes urc 
          JOIN Users u 
            ON urc.user_id = u.id
        WHERE u.email = '${userPayload.email}';`;
    const result = await query(queryUserSQL);
    if (!result[0] || result[0].code !== userPayload.code) {
      res.status(401).send("Datos no válidos");
      return;
    }
    const parsedExpirationDate = new Date(
      new Date(result[0].expiration_date).setHours(
        new Date(result[0].expiration_date).getHours() - 6
      )
    );

    if (parsedExpirationDate < new Date()) {
      res
        .status(401)
        .send(
          "El código de recuperación brindado ya expiró. Solicite un nuevo código de recuperación."
        );
      return;
    }
    const userCode = result[0];

    const updatePasswordSQL = `UPDATE test.Users
        SET password='${await bcrypt.hash(userPayload.password, saltRounds)}'
        WHERE id=${userCode.id};`;

    await query(updatePasswordSQL);

    const deleteCodeSQL = `DELETE FROM test.Users_Recovery_Codes WHERE user_id=${userCode.id};`;
    await query(deleteCodeSQL);

    res.status(204).send();
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};

exports.listUsers = async (req, res) => {
  try {
    const result = await db.User.find();
    res.json(result);
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};
