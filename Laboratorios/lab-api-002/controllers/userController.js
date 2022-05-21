const UserDataAccess = require("../data_access/userDataAccess");
const asyncHandler = require("../middlewares/asyncHandler");

// Database schema
const db = require("../models/index");

// Errors
const { NotFound } = require("../utils/sequelizeError");

exports.getUsers = asyncHandler(async (req, res, next) => {
    const userDataAccess = new UserDataAccess(db);
    const users = await userDataAccess.getUsers();
    if (!users) {
      throw new NotFound("No users found");
    }
    res.status(200).json(users);
  });
  

  exports.createUser = asyncHandler(async (req, res, next) => {
    const userDataAccess = new UserDataAccess(db);
    const newUser = await userDataAccess.createUser(req.body);
    res.status(200).json(newUser);
  });
  