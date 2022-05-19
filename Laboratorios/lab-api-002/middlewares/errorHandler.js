const { SequelizeError } = require("../utils/sequelizeError");
const { ValidationError } = require("joi");
const errorHandler = (err, req, res, next) => {
  // If error is about Sequelize
  if (err instanceof SequelizeError) {
    return res.status(err.getCode()).json({
      status: "sequelize error",
      message: err.message,
    });
  }

  // If error is about Joi validation data
  if (err instanceof ValidationError) {
    return res.status(406).json({
      status: "error",
      message: err.message,
    });
  }
  // If error is something else
  return res.status(500).json({
    status: "internal error",
    message: err.message,
    error: err,
  });
};

module.exports = errorHandler;
