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
const { ROLES } = require("../utils/constants");

router
  .route("/")
    .get([checkUserIsAuthenticated, checkRoles([ROLES.ADMIN])], listUsers)
    .post(createUser);

router.route("/login").post(loginUser);

router.route("/recover-password").post(recoverPassword);

router.route("/reset-password").patch(resetPassword);

module.exports = router;
