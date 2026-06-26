import { asyncHandler } from "../utils/asyncHandler.js";
import {
  registerEvent,
  cancelRegistration as cancelRegistrationService,
  getUserRegistrations as getUserRegistrationsService,
} from "../services/registration.Service.js";

export const registerForEvent = asyncHandler(async (req, res) => {
  const registration = await registerEvent(req.user._id, req.params.eventId);

  res.status(201).json({
    success: true,
    message: "Registration successful",
    registration,
  });
});

export const cancelRegistration = asyncHandler(async (req, res) => {
  await cancelRegistrationService(req.user._id, req.params.eventId);

  res.status(200).json({
    success: true,
    message: "Registration cancelled",
  });
});

export const getUserRegistrations = asyncHandler(async (req, res) => {
  const registrations = await getUserRegistrationsService(req.user._id);

  res.status(200).json({
    success: true,
    message: "User registrations fetched successfully",
    registrations,
  });
});