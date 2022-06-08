const express = require("express");
const dotenv = require("dotenv");
const swaggerUI = require("swagger-ui-express");
const cors = require("cors");
const swaggerFile = require('./swagger.json')
const usersRoutes = require("./routes/users");
dotenv.config();
const server = express();
server.use(express.json());
server.use(cors());
//connect();

//Mount routes
server.use("/users", usersRoutes);

// Documentation setup
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

server.listen(process.env.PORT || 8000);
console.log(
  `The server is listening on http://localhost:${process.env.PORT || 8000}
  You can navigate the documentation at http://localhost:${process.env.PORT || 8000}/docs`
);
