const mongoose = require("mongoose");
const Joi = require("joi");
const { Content, contentSchema, contentValidationSchema } = require("./content");

const articleSchema = contentSchema;
const Article = Content.discriminator('Article', articleSchema);

const validate = (data) => {
    return contentValidationSchema.validate(data);
};

module.exports = { Article, validate };