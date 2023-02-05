const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

module.exports.postValidSchema = Joi.object({
  title: Joi.string().required().trim().escapeHTML().min(3).max(50),
  body: Joi.string().required().trim().escapeHTML().min(3).max(1000),
  tags: Joi.array().required().min(1).max(10).items(Joi.string().escapeHTML().trim().min(3).max(20))
}).options({abortEarly : false});

module.exports.registerUserValidation = Joi.object({
  username: Joi.string().required().alphanum().trim().min(3).max(20).escapeHTML(),
  email: Joi.string().required().email().trim().escapeHTML(),
  password: Joi.string().required().min(8).max(20).escapeHTML(),
  confirmPassword: Joi.string().required().escapeHTML().valid(Joi.ref('password')).messages({'any.only':'"confirmPassword" must be same as password'}),
}).options({abortEarly : false})