const express = require("express");
const router = express.Router();
const {
  uploadFile
} = require("../controllers/upload");
const { upload } = require("../middlewares/upload");

router
  .route("/")
  .post(upload.single("file"), uploadFile);

module.exports = router;
