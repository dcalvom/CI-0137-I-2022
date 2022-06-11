const Joi = require('joi');

exports.createItemSchema = Joi.object({
    nombre: Joi.string().required(),
    descripcion: Joi.string().required(),
    categoria: Joi.number().integer().required(),
    condicion: Joi.number().integer().required(),
    provincia: Joi.number().integer().required(),
    foto: Joi.string().uri().required()
});
