const express = require("express");
const router = express.Router();

// Controllers methods
const { getUsers, createUser } = require("../controllers/userController");

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
router.route("/users")
    .get(getUsers)
    .post(createUser);

module.exports = router;
