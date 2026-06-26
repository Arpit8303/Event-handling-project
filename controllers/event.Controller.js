import { asyncHandler } from "../utils/asyncHandler.js";
import {
  createEvent as createEventService,
  getAllEvents as getAllEventsService,
  getEventById as getEventByIdService,
  updateEvent as updateEventService,
  deleteEvent as deleteEventService,
} from "../services/event.Service.js";

export const createEvent = asyncHandler(async (req, res) => {
  const event = await createEventService(req.body, req.user._id);

  res.status(201).json({
    success: true,
    message: "Event created successfully",
    event,
  });
});

export const getAllEvents = asyncHandler(async (req, res) => {
  const user = req.user || { role: "guest" };
  const events = await getAllEventsService(req.query, user);

  res.status(200).json({
    success: true,
    message: "Events fetched successfully",
    events,
  });
});

export const getEventById = asyncHandler(async (req, res) => {
  const user = req.user || { role: "guest", _id: null };
  const event = await getEventByIdService(req.params.id, user);

  res.status(200).json({
    success: true,
    message: "Event fetched successfully",
    event,
  });
});

export const updateEvent = asyncHandler(async (req, res) => {
  const event = await updateEventService(req.params.id, req.body, req.user);

  res.status(200).json({
    success: true,
    message: "Event updated successfully",
    event,
  });
});

export const deleteEvent = asyncHandler(async (req, res) => {
  const event = await deleteEventService(req.params.id, req.user);

  res.status(200).json({
    success: true,
    message: "Event deleted successfully",
    event,
  });
});