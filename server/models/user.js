const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isTzunai: { type: Boolean, default: false },
  baskets: { type: Array, default: [] },
  favoriteContents: { type: String, default: "" },
  verified: { type: Boolean, default: false },
  location: {
    lat: { type: Number, required: false },
    lng: { type: Number, required: false }
  },
  profilePictureUrl: { type: String, required: false }
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("user", userSchema);
const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .required()
      .label("First Name"),
    lastName: Joi.string()
      .required()
      .label("Last Name"),
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: passwordComplexity()
      .required()
      .label("Password"),
  });
  return schema.validate(data);
};
module.exports = { User, validate };
