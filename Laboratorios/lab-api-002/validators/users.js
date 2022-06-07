const Joi = require("joi");

exports.createUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).alphanum().required(),
    phoneCountryCode: Joi.number().min(1).max(999),
    phone: Joi.number(),
    birthdate: Joi.date().less('now')
});

exports.resetPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).alphanum().required(),
    code: Joi.number().min(100000).max(999999).required().error(() => new Error("El código debe ser un número entero de 6 dígitos.")),
});
