const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
});

const Article = mongoose.model("article", userSchema);
const validate = (data) => {
  const schema = Joi.object({
    title: Joi.string()
      .required()
      .label("Title"),
    text: Joi.string()
      .required()
      .label("Text"),
  });
  return schema.validate(data);
};
module.exports = { Article, validate };
