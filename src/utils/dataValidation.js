// utils/personValidation.js
const Joi = require('joi');

const validatePersonData = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    hobbies: Joi.array().items(Joi.string())
});

module.exports = validatePersonData;
