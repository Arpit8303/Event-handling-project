import { asyncHandler } from "../utils/asyncHandler.js";
import { registerUser, loginUser } from "../services/auth.Service.js";

export const register = asyncHandler(async (req, res) => {
  const result = await registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    token: result.token,
    user: result.user,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await loginUser(email, password);

  res.status(200).json({
    success: true,
    message: "Login successful",
    token: result.token,
    user: result.user,
  });
});