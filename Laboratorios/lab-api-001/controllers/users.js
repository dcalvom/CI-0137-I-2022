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
      message: "Ocurrió un error al recuperar los usuarios.",
      error,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const userPayload = req.body;
    const newUser = await db.User.create({
      name: userPayload.name,
      email: userPayload.email,
      password: await bcrypt.hash(userPayload.password, saltRounds),
      phoneCountryCode: userPayload.countryCode,
      phone: userPayload.phone,
      birthday: userPayload.birthday,
    });
    delete newUser.password;
    res.json(newUser);
  } catch (error) {
    res.status(500).json({
      message:
        "Ocurrió un error al crear el usuario. Intente nuevamente. Si el error persiste, contacte al administrador del sistema.",
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const userPayload = req.body;
    const user = db.User.findOne({ where: { email : userPayload.email } });
    if (
      !user ||
      !(await bcrypt.compare(userPayload.password, user.password))
    ) {
      res.status(401).send("Invalid credentials");
      return;
    }
    const sqlQueryUserRoles = `SELECT * FROM test.Users_Roles WHERE id_usuario = '${user.id}';`;
    const roles = await query(sqlQueryUserRoles);

    const rolesIds = roles.map((r) => r.id_rol);

    delete user.password;
    const token = jwt.sign(
      { userId: user.id, roles: rolesIds },
      process.env.JWT_KEY,
      {
        expiresIn: "10m",
      }
    );
    res.json({
      ...user,
      token,
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
