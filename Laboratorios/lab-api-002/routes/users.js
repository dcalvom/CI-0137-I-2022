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

const router = express.Router();

router.route("/").get([userIsAuthenticated, userIsInRole([ROLES.ADMIN])], listUsers);

router.route("/").post(createUser);

router.route("/login").post(loginUser);

router.route("/recover-password").post(recoverPassword);

router.route("/reset-password").patch(resetPassword);

module.exports = router;
