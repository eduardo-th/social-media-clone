const Joi = require('joi');

module.exports.postValidSchema = Joi.object({
  title: Joi.string().required().trim().min(3).max(50),
  body: Joi.string().required().trim().min(3).max(1000),    
  tags: Joi.array().required().min(1).max(10).items(Joi.string().trim().min(3).max(20))
}).options({abortEarly : false});

module.exports.registerUserValidation = Joi.object({
  username: Joi.string().required().alphanum().trim().min(3).max(20),
  email: Joi.string().required().email().trim(),
  password: Joi.string().required().min(8).max(20),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({'any.only':'"confirmPassword" must be same as password'}),  
}).options({abortEarly : false})