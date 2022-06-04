const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Lab CI0137 - API",
    description: "Este es el API del laboratorio de backend del curso CI0137",
  },
  host: "api.ci0137.ucr.ac.cr",
  schemes: ["http", "https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./server.js");
});
