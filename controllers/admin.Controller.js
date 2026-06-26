import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.Model.js";
import Event from "../models/event.Model.js";
import {
  approveEvent as approveEventService,
  rejectEvent as rejectEventService,
} from "../services/event.Service.js";

export const approveEvent = asyncHandler(async (req, res) => {
  const event = await approveEventService(req.params.eventId);

  res.status(200).json({
    success: true,
    message: "Event approved successfully",
    event,
  });
});

export const rejectEvent = asyncHandler(async (req, res) => {
  const event = await rejectEventService(req.params.eventId);

  res.status(200).json({
    success: true,
    message: "Event rejected successfully",
    event,
  });
});

export const getPendingEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ status: "Pending" }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: "Pending events fetched successfully",
    events,
  });
});

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    users,
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});