import { body } from "express-validator";

export const createEventValidator = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("date").isISO8601().toDate().withMessage("Valid date is required"),
  body("time").trim().notEmpty().withMessage("Time is required"),
  body("location").trim().notEmpty().withMessage("Location is required"),
  body("capacity")
    .isInt({ min: 1 })
    .withMessage("Capacity must be at least 1"),
];

export const updateEventValidator = [
  body("title").optional().trim().notEmpty().withMessage("Title must not be empty"),
  body("description").optional().trim().notEmpty().withMessage("Description must not be empty"),
  body("date").optional().isISO8601().toDate().withMessage("Valid date is required"),
  body("time").optional().trim().notEmpty().withMessage("Time must not be empty"),
  body("location").optional().trim().notEmpty().withMessage("Location must not be empty"),
  body("capacity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Capacity must be at least 1"),
];
