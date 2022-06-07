const express = require("express");
const {
  createUser,
  loginUser,
  recoverPassword,
  resetPassword,
  listUsers,
} = require("../controllers/users");
const { userIsAuthenticated, userIsInRole } = require("../middlewares/auth");
const { ROLES } = require("../utils/constants");
const { validateSchema } = require("../middlewares/validation");
const {
  createUserSchema,
  resetPasswordSchema,
} = require("../validators/users");

const router = express.Router();

router.route("/").get([userIsAuthenticated, userIsInRole([ROLES.ADMIN])], listUsers);

router.route("/").post([validateSchema(createUserSchema)], createUser);

router.route("/login").post(loginUser);

router.route("/recover-password").post(recoverPassword);

router.route("/reset-password").patch([validateSchema(resetPasswordSchema)], resetPassword);

module.exports = router;
