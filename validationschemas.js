const Joi = require('joi');

module.exports.postValidSchema = Joi.object({
  title: Joi.string().required().min(3).max(50),
  body: Joi.string().required().min(3).max(1000),
});
