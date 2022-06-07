const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  recoverPassword,
  resetPassword,
  listUsers,
} = require("../controllers/users");
const { checkUserIsAuthenticated, checkRoles } = require("../middlewares/auth");
const { validateSchema } = require("../middlewares/validation");
const { ROLES } = require("../utils/constants");
const {
  createUserSchema,
  loginSchema,
  recoverPasswordSchema,
  resetPasswordSchema,
} = require("../validators/users");

router
  .route("/")
  .get([checkUserIsAuthenticated, checkRoles([ROLES.ADMIN])], listUsers)
  .post([validateSchema(createUserSchema)], createUser);

router.route("/login").post([validateSchema(loginSchema)], loginUser);

router
  .route("/recover-password")
  .post([validateSchema(recoverPasswordSchema)], recoverPassword);

router
  .route("/reset-password")
  .patch([validateSchema(resetPasswordSchema)], resetPassword);

module.exports = router;
