const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendRecoveryCodeEmail } = require("../services/mailService");
const db = require("../models/index");
const saltRounds = 10;

exports.createProduct = async (req, res) => {
  // #swagger.tags = ['Product']
  /*  #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Create a product',
          schema: { $ref: '#/definitions/AddProduct' }
  } */
  try {
    const productPayload = req.body;
    /*const newUser = await db.User.create({
      name: userPayload.name,
      email: userPayload.email,
      password: await bcrypt.hash(userPayload.password, saltRounds),
      phoneCountryCode: userPayload.phoneCountryCode,
      phone: userPayload.phone,
      birthdate: new Date(userPayload.birthdate),
    });*/
    res.json(productPayload);
  } catch (error) {
    res.status(500).json({
      message: "Ocurrió un error al insertar el usuario.",
      error,
    });
    return;
  }
};
