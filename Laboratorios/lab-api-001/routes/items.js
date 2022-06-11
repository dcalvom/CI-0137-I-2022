const express = require("express");
const router = express.Router();
const {
  createItem
} = require("../controllers/items");
const { validateSchema } = require("../middlewares/validation");
const {
  createItemSchema,
} = require("../validators/items");

router
  .route("/")
  .post([validateSchema(createItemSchema)], createItem);

module.exports = router;
