import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";
import { eventIdValidator } from "../validators/registration.Validator.js";
import {
  registerForEvent,
  cancelRegistration,
  getUserRegistrations,
} from "../controllers/registration.Controller.js";

const router = express.Router();

router.post("/:eventId", authMiddleware, eventIdValidator, validationMiddleware, registerForEvent);
router.delete("/:eventId", authMiddleware, eventIdValidator, validationMiddleware, cancelRegistration);
router.get("/my", authMiddleware, getUserRegistrations);

export default router;