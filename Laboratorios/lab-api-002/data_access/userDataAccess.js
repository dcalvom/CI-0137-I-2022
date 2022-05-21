"use strict";

module.exports = class UserDataAccess {
  constructor(dbSchema) {
    this.User = dbSchema.User;
  }

  /**
   * [Retrieve users from  database]
   * @return {[json]} [response with json object]
   */

  async getUsers() {
    const users = await this.User.findAndCountAll();
    return users;
  }

  async createUser(newUser) {
    const users = await this.User.create(newUser);
    return users;
  }
};
