// Async handler
const asyncHandler = require("../middlewares/asyncHandler");

/**
 * [Sends welcome message]
 * @route GET[/]
 * @return {[json]} [Response with json object]
 */

exports.sendWelcomeMessage = asyncHandler((req, res, next) => {
  res.json({ msg: "Welcome, create something cool!" });
});
