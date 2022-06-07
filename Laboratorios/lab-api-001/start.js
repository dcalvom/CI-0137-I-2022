const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Lab CI0137 - API",
    description: "Este es el API del laboratorio de backend del curso CI0137",
  },
  host: "localhost:7500",
  schemes: ["http", "https"],
  definitions: {
    CreateUser: {
      name: "José Rodríguez Pérez",
      email: "jose@correo.com",
      password: "patito",
      countryCode: 506,
      phone: 70155104,
      birthday: "1989-10-16",
    },
    LoginUser: {
      email: "jose@correo.com",
      password: "patito",
    },
    RecoverPassword: {
      email: "jose@correo.com",
    },
    ResetPassword: {
      email: "jose@correo.com",
      password: "patito",
      code: 123456,
    },
  },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./server.js");
});
