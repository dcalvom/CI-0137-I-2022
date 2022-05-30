const express = require("express");
const usersRoutes = require("./routes/users");
const { connectDB } = require("./services/dbService");

const server = express();
server.use(express.json());
connectDB();

//Mount routes
server.use("/users", usersRoutes);

server.listen(process.env.PORT || 7500);
console.log(
  `The server is running at http://localhost:${process.env.PORT || 7500}`
);
