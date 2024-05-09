import { body, param } from "express-validator";

export const registerBodyValidators = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),
  body("password").notEmpty().withMessage("Password is required"),
  body("username").notEmpty().withMessage("Username is required"),
];

export const loginBodyValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),
  body("password").notEmpty().withMessage("Password is required"),
];
