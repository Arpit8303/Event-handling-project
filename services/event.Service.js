import Event from "../models/event.Model.js";
import ApiError from "../utils/ApiError.js";

export const createEvent = async (eventData, userId) => {
  const event = await Event.create({
    ...eventData,
    createdBy: userId,
    status: "Pending",
  });

  return event;
};

export const getAllEvents = async (query, user) => {
  const filter = {};

  if (query.search) {
    filter.title = { $regex: query.search, $options: "i" };
  }

  if (query.date) {
    filter.date = new Date(query.date);
  }

  if (query.location) {
    filter.location = { $regex: query.location, $options: "i" };
  }

  if (user.role !== "admin") {
    filter.status = "Approved";
  }

  return Event.find(filter).sort({ date: 1 });
};

export const getEventById = async (eventId, user) => {
  const event = await Event.findById(eventId);
  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  const userId = user._id ? user._id.toString() : null;
  if (
    event.status !== "Approved" &&
    user.role !== "admin" &&
    event.createdBy.toString() !== userId
  ) {
    throw new ApiError(404, "Event not found");
  }

  return event;
};

export const updateEvent = async (eventId, updateData, user) => {
  const event = await Event.findById(eventId);
  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  if (event.createdBy.toString() !== user._id.toString() && user.role !== "admin") {
    throw new ApiError(403, "Not authorized to update this event");
  }

  Object.assign(event, updateData);
  return await event.save();
};

export const deleteEvent = async (eventId, user) => {
  const event = await Event.findById(eventId);
  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  if (event.createdBy.toString() !== user._id.toString() && user.role !== "admin") {
    throw new ApiError(403, "Not authorized to delete this event");
  }

  await event.remove();
  return event;
};

export const approveEvent = async (eventId) => {
  const event = await Event.findById(eventId);
  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  event.status = "Approved";
  return await event.save();
};

export const rejectEvent = async (eventId) => {
  const event = await Event.findById(eventId);
  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  event.status = "Rejected";
  return await event.save();
};
