// Packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const colors = require("colors");

const errorHandler = require("./middlewares/errorHandler");

// Multer
const multer = require("multer");
const upload = multer();

// Load env variables
dotenv.config({ path: ".env" });

// Initialize app
const app = express();

//Enable cors
app.use(cors({}));

// Route files
const welcomeRoute = require("./routes/welcome");

// Body paser
app.use(express.json({ limit: "20mb" }));

// Development setup
if (process.env.NODE_ENV == "development") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

// Documentation setup

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Boilerplate API",
      version: "2.1.0",
    },
  },
  apis: ["./routes/welcome.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Mount routes
app.use(welcomeRoute);

// Middlewares
app.use(errorHandler);

// Multer
app.use(upload.any());

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .blue
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
