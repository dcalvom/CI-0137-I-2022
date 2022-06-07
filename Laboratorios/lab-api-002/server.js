const express = require("express");
const swaggerUI = require("swagger-ui-express");
const cors = require('cors');

const usersRoutes = require("./routes/users");
const swaggerFile = require("./swagger.json");

const server = express();

server.use(express.json());
server.use(cors());

//Mount routes
server.use("/users", usersRoutes);

//Documentation setup
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

server.listen(process.env.PORT || 7500);
console.log(
  `The server is running at http://localhost:${process.env.PORT || 7500}
   You can find the docs at http://localhost:${process.env.PORT || 7500}/docs`
);
