import express from "express";
import {
  register,
  login,
} from "../controllers/auth.Controller.js";
import {
  registerValidator,
  loginValidator,
} from "../validators/auth.Validator.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/register", registerValidator, validationMiddleware, register);
router.post("/login", loginValidator, validationMiddleware, login);

export default router;