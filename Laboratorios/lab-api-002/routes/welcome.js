const express = require("express");
const router = express.Router();

// Controllers methods
const { sendWelcomeMessage } = require("../controllers/welcomeController");

/**
 * @openapi
 * tags: []
 * components: {}
 * paths:
 *  /:
 *    get:
 *      tags:
 *       - Welcome
 *      description: Sends welcome message.
 *      responses:
 *        200:
 *          description: Message sent correctly
 *
 */
router.route("/").get(sendWelcomeMessage);

module.exports = router;
