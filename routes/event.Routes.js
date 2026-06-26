import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";
import { createEventValidator, updateEventValidator } from "../validators/event.Validator.js";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/event.Controller.js";

const router = express.Router();

router.post("/", authMiddleware, createEventValidator, validationMiddleware, createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.put("/:id", authMiddleware, updateEventValidator, validationMiddleware, updateEvent);
router.delete("/:id", authMiddleware, deleteEvent);

export default router;