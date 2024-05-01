import { body, param } from "express-validator";

export const bodyValidors = [
  body("name").notEmpty().withMessage("Name is required"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isDecimal({
      decimal_digits: "2",
    })
    .withMessage("Price digits must be 2")
    .isLength({
      max: 6,
    })
    .withMessage("Price maximum length is 5"),
  body("symbol").notEmpty().withMessage("Symbol is required"),
  body("iconUrl").notEmpty().withMessage("Icon url is required"),
];

export const idParamValidator = [
  param("cryptoId")
    .notEmpty()
    .withMessage("Crypto id is required")
    .isInt()
    .withMessage("Cypto id must be an integer"),
];
