const Joi = require('joi');

exports.postSchema = Joi.object({
  title: Joi.string().min(3).required(),
  content: Joi.string().min(10).required(),
  category: Joi.string().required(),
  // featuredImage: Joi.string().uri().optional(),
  // excerpt: Joi.string().max(200).optional(),
  author: Joi.string().required(),
  slug: Joi.string().required()
});
