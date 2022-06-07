const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendRecoveryCodeEmail } = require("../services/mailService");
const db = require("../models/index");
const saltRounds = 10;

exports.listUsers = async (req, res) => {
  // #swagger.tags = ['Users']
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
  // #swagger.tags = ['Users']
  /*  #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Add a user',
          schema: { $ref: '#/definitions/CreateUser' }
  } */
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
  // #swagger.tags = ['Users']
  /*  #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Add a user',
          schema: { $ref: '#/definitions/LoginUser' }
  } */
  try {
    const userPayload = req.body;
    const user = await db.User.findOne({ where: { email : userPayload.email } });
    if (
      !user ||
      !(await bcrypt.compare(userPayload.password, user.password))
    ) {
      res.status(401).send("Invalid credentials");
      return;
    }
    const roles = await db.UserRole.findAll({ where: { idUsuario: user.id } });
    const rolesIds = roles.map((r) => r.idRol);
    const token = jwt.sign(
      { userId: user.id, roles: rolesIds },
      process.env.JWT_KEY,
      {
        expiresIn: "10m",
      }
    );
    res.json({
      ...user.toJSON(),
      token,
    });
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};

exports.recoverPassword = async (req, res) => {
  // #swagger.tags = ['Users']
  /*  #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Add a user',
          schema: { $ref: '#/definitions/RecoverPassword' }
  } */
  try {
    const userPayload = req.body;
    const user = await db.User.findOne({ where: { email : userPayload.email } });
    if (!user) {
      res.status(401).send("Datos no válidos");
      return;
    }
    const randomToken = Math.floor(
      Math.random() * (999999 - 100000 + 1) + 100000
    );

    await db.ConfirmationCode.destroy({
      where: {
        idUsuario: user.id,
      },
    });

    await db.ConfirmationCode.create({
      idUsuario: user.id,
      code: randomToken,
    });

    await sendRecoveryCodeEmail(user.email, randomToken);

    res.status(204).send();
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};

exports.resetPassword = async (req, res) => {
  // #swagger.tags = ['Users']
  /*  #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Add a user',
          schema: { $ref: '#/definitions/ResetPassword' }
  } */
  try {
    const userPayload = req.body;
    const user = await db.User.findOne({
      where: { email: userPayload.email },
      include: "confirmationCode",
    });

    if (!user || !user.confirmationCode || user.confirmationCode.code !== userPayload.code) {
      res.status(401).send("Datos no válidos");
      return;
    }

    user.password = await bcrypt.hash(userPayload.password, saltRounds);
    await user.save();

    await db.ConfirmationCode.destroy({
      where: {
        idUsuario: user.id,
      },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};
