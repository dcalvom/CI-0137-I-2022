const express = require("express");
const {
  createProduct,
} = require("../controllers/products");
const { userIsAuthenticated, userIsInRole } = require("../middlewares/auth");
const { ROLES } = require("../utils/constants");
const { validateSchema } = require("../middlewares/validation");
const {
  createProductSchema,
} = require("../validators/products");

const router = express.Router();

router.route("/").post([validateSchema(createProductSchema)], createProduct);

module.exports = router;
