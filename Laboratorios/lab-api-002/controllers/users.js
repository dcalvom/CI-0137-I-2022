const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendRecoveryCodeEmail } = require("../services/mailService");
const db = require("../models/index");

const saltRounds = 10;

exports.createUser = async (req, res) => {
  try {
    const userPayload = req.body;
    const newUser = await db.User.create({
      name: userPayload.name,
      email: userPayload.email,
      password: await bcrypt.hash(userPayload.password, saltRounds),
      phoneCountryCode: userPayload.phoneCountryCode,
      phone: userPayload.phone,
      birthdate: new Date(userPayload.birthdate),
    });
    res.json(newUser);
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
    const userPayload = req.body;
    const user = await db.User.findOne({
      where: { email: userPayload.email },
    });
    if (!user || !(await bcrypt.compare(userPayload.password, user.password))) {
      res.status(401).send("Invalid credentials");
      return;
    }
    const roles = await db.UserRole.findAll({ where: { userId: user.id } });
    const rolesIds = roles.map((r) => r.id);

    const token = jwt.sign(
      { userId: user.id, roles: rolesIds },
      process.env.JWT_KEY,
      {
        expiresIn: "5m",
      }
    );
    const result = {
      ...user.toJSON(),
      token,
    };
    res.json(result);
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};

exports.recoverPassword = async (req, res) => {
  try {
    const userPayload = req.body;
    const user = await db.User.findOne({
      where: { email: userPayload.email },
    });
    if (!user) {
      res.status(401).send("Datos no válidos");
      return;
    }
    const randomToken = Math.floor(
      Math.random() * (999999 - 100000 + 1) + 100000
    );

    await db.UserRecoveryCode.destroy({
      where: {
        userId: user.id,
      },
    });

    const nowDate = new Date();
    const expirationDate = new Date(
      nowDate.setMinutes(nowDate.getMinutes() + 15)
    ).toISOString();

    await db.UserRecoveryCode.create({
      userId: user.id,
      code: randomToken,
      expirationDate,
    });

    await sendRecoveryCodeEmail(user.email, randomToken);

    res.status(200).send();
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const userPayload = req.body;
    const user = await db.User.findOne({
      where: { email: userPayload.email },
      include: ["recoveryCode"],
    });
    console.log("user: ", user.toJSON());
    if (
      !user ||
      !user.recoveryCode ||
      user.recoveryCode.code !== userPayload.code
    ) {
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
