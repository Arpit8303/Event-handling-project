import { param } from "express-validator";

export const eventIdValidator = [
  param("eventId")
    .isMongoId()
    .withMessage("Valid event ID is required"),
];
