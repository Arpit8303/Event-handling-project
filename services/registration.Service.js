import Registration from "../models/registration.Model.js";
import Event from "../models/event.Model.js";
import ApiError from "../utils/ApiError.js";

export const registerEvent = async (userId, eventId) => {
  const event = await Event.findById(eventId);
  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  if (event.status !== "Approved") {
    throw new ApiError(400, "Event is not approved for registration");
  }

  const alreadyRegistered = await Registration.findOne({ user: userId, event: eventId });
  if (alreadyRegistered) {
    throw new ApiError(400, "Already registered for this event");
  }

  if (event.capacity <= 0) {
    throw new ApiError(400, "Event is full");
  }

  event.capacity -= 1;
  await event.save();

  return await Registration.create({
    user: userId,
    event: eventId,
  });
};

export const cancelRegistration = async (userId, eventId) => {
  const registration = await Registration.findOne({ user: userId, event: eventId });
  if (!registration) {
    throw new ApiError(404, "Registration not found");
  }

  await registration.deleteOne();
  const event = await Event.findById(eventId);

  if (event) {
    event.capacity += 1;
    await event.save();
  }

  return true;
};

export const getUserRegistrations = async (userId) => {
  return Registration.find({ user: userId, status: "Registered" }).populate({
    path: "event",
    match: { status: "Approved" },
    select: "title date time location capacity status",
  });
};
