/**
 * [Extends Sequelize Errors]
 * @return {[SequelizeError]} [Returns an Instance of General Error]
 */
const { BaseError } = require("sequelize");

class SequelizeError extends BaseError {
  constructor(message) {
    super();
    this.message = message;
    // this.statusCode = statusCode;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return 400;
    }
    if (this instanceof NotFound) {
      return 404;
    }
    if (this instanceof InvalidCredentials || this instanceof SessionExpired) {
      return 401;
    }
    if (this instanceof PrimaryMustBeUnique || this instanceof Conflict) {
      return 409;
    }
    if (this) return 500;
  }
}

class InvalidCredentials extends SequelizeError {}
class BadRequest extends SequelizeError {}
class NotFound extends SequelizeError {}
class PrimaryMustBeUnique extends SequelizeError {}
class Conflict extends SequelizeError {}
class SessionExpired extends SequelizeError {}

module.exports = {
  SequelizeError,
  BadRequest,
  NotFound,
  InvalidCredentials,
  PrimaryMustBeUnique,
  Conflict,
  SessionExpired,
};
