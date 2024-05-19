const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  heartCount: { type: Number, default: 0 },
  tzunaiName: { type: String, required: true },
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
    heartCount: Joi.number()
      .label("Heart Count"),
    tzunaiName: Joi.string()
      .required()
      .label("Tzunai Name"),
  });
  return schema.validate(data);
};
module.exports = { Article, validate };
