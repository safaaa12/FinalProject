const mongoose = require("mongoose");
const Joi = require("joi");
const { Content, contentValidationSchema } = require("./content");

const recipeSchema = new mongoose.Schema({
  products: { type: String, required: true },
}, { _id: false });

const Recipe = Content.discriminator('Recipe', recipeSchema);

const validate = (data) => {
  return contentValidationSchema.concat(
    Joi.object({
      products: Joi.string().required().label("Products")
    })
  ).validate(data);
};

module.exports = { Recipe, validate };