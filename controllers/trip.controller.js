import { Trip } from "../models/trip.model.js";

// Get All trips
export const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find();

   

    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching trips",
    });
  }
};

//Get trips by id i.e one trip only

export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "hello No trips found" });
    }

    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching trips",
    });
  }
};

// Create a trip
export const addTrip = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      duration,
      startDate,
      endDate,
      location,
      imageUrl,
      maxParticipants,
      availableSeats,
    } = req.body;

    if (
      !title ||
      !description ||
      !price ||
      !duration ||
      !startDate ||
      !endDate ||
      !location ||
      !imageUrl ||
      !maxParticipants ||
      !availableSeats
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTrip = new Trip({
      title,
      description,
      price,
      duration,
      startDate,
      endDate,
      location,
      imageUrl,
      maxParticipants,
      availableSeats,
      createdBy: req.user.userId,
    });

    await newTrip.save();
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(500).json({
      message: "Error creating trip",
    });
  }
};

// Update a trip
export const updateTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      price,
      duration,
      startDate,
      endDate,
      location,
      imageUrl,
      maxParticipants,
      availableSeats,
    } = req.body;

    const trip = await Trip.findById(id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    trip.title = title || trip.title;
    trip.description = description || trip.description;
    trip.price = price || trip.price;
    trip.duration = duration || trip.duration;
    trip.startDate = startDate || trip.startDate;
    trip.endDate = endDate || trip.endDate;
    trip.location = location || trip.location;
    trip.imageUrl = imageUrl || trip.imageUrl;
    trip.maxParticipants = maxParticipants || trip.maxParticipants;
    trip.availableSeats = availableSeats || trip.availableSeats;

    await trip.save();
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({
      message: "Error updating trip",
    });
  }
};

// Delete a trip
export const deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;

    const trip = await Trip.findByIdAndDelete(id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting trip",
    });
  }
};
