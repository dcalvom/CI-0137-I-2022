const express = require("express");
const dotenv = require("dotenv");
const swaggerFile = require('./swagger.json')
const swaggerUI = require("swagger-ui-express");
const usersRoutes = require("./routes/users");
dotenv.config();
const server = express();
server.use(express.json());
//connect();

//Mount routes
server.use("/users", usersRoutes);

// Documentation setup
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

server.listen(process.env.PORT || 8000);
console.log(
  `The server is listening on http://localhost:${process.env.PORT || 8000}`
);
