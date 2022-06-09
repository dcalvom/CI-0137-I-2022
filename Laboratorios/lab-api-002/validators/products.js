const Joi = require("joi");

exports.createProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().min(0).required(),
    picture: Joi.string().uri().required()
});
