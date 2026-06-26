import { asyncHandler } from "../utils/asyncHandler.js";

export const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "User profile fetched successfully",
    user: req.user,
  });
});