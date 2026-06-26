import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";
import { userIdValidator } from "../validators/user.Validator.js";
import {
  approveEvent,
  rejectEvent,
  getPendingEvents,
  getUsers,
  deleteUser,
} from "../controllers/admin.Controller.js";

const router = express.Router();

router.get("/users", authMiddleware, adminMiddleware, getUsers);
router.delete(
  "/users/:userId",
  authMiddleware,
  adminMiddleware,
  userIdValidator,
  validationMiddleware,
  deleteUser
);
router.get("/events/pending", authMiddleware, adminMiddleware, getPendingEvents);
router.put("/approve/:eventId", authMiddleware, adminMiddleware, approveEvent);
router.put("/reject/:eventId", authMiddleware, adminMiddleware, rejectEvent);

export default router;