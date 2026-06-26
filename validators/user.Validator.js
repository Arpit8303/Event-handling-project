import { param } from "express-validator";

export const userIdValidator = [
  param("userId").isMongoId().withMessage("Valid user ID is required"),
];
