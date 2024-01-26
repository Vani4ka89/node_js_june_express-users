import Joi from "joi";

import { regexConstants } from "../constants";
import { EGenders } from "../enums";

export class UserValidator {
  private static firstName = Joi.string().min(3).max(30).trim();
  private static age = Joi.number().min(1).max(199);
  private static gender = Joi.string().valid(...Object.values(EGenders));
  private static email = Joi.string()
    .regex(regexConstants.EMAIL)
    .lowercase()
    .trim()
    .messages({
      "string.empty": "Це поле обов'язкове",
      "string.email": "Адрес електронної пошти має невірний формат",
    });
  private static password = Joi.string().regex(regexConstants.PASSWORD).trim();

  public static create = Joi.object({
    name: this.firstName.required(),
    age: this.age.required(),
    gender: this.gender.required(),
    email: this.email.required(),
    password: this.password.required(),
  });

  public static update = Joi.object({
    name: this.firstName,
    age: this.age,
    gender: this.gender,
  });

  public static login = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });

  public static changePassword = Joi.object({
    oldPassword: this.password.required(),
    newPassword: this.password.required(),
  });

  public static forgotPassword = Joi.object({
    email: this.email.required(),
  });

  public static setForgotPassword = Joi.object({
    password: this.password.required(),
  });
}
