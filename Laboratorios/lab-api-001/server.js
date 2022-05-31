const express = require("express");
const usersRoutes = require("./routes/users");
const { connect } = require("./services/databaseService");

const server = express();
server.use(express.json());
connect();

//Mount routes
server.use("/users", usersRoutes);

server.listen(process.env.PORT || 8000);
console.log(
  `The server is listening on http://localhost:${process.env.PORT || 8000}`
);
