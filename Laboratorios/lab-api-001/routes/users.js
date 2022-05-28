const express = require("express");
const {
  createUser,
  loginUser,
  recoverPassword,
  resetPassword,
  listUsers,
} = require("../controllers/users");
const { checkUserIsAuthenticated, checkRoles } = require("../middlewares/auth");
const router = express.Router();
const { ROLES } = require("../utils/contants");

router
  .route("/")
  .get([checkUserIsAuthenticated, checkRoles([ROLES.ADMIN])], listUsers);

router.route("/").post(createUser);

router.route("/login").post(loginUser);

router.route("/recover-password").post(recoverPassword);

router.route("/reset-password").patch(resetPassword);

module.exports = router;
