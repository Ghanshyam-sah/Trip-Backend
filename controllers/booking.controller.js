import { Booking } from "../models/bookings.model.js";
import { Trip } from "../models/trip.model.js";

// Get all bookings
export const getBookigs = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("tripId","title");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching bookings",
    });
  }
};

//get bookings by ID

export const getBookingsById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id).populate("tripId","title description price");

    if (!booking) {
      return res.status(404).json({ message: "No bookings found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching booking",
    });
  }
};

//get my bookings

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({customerId: req.user.userId}).populate("tripId","title");


    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching bookings",
    });
  }
};

// Create a new booking
export const addBooking = async (req, res) => {
  try {
    const {
      customerEmail,
      customerPhone,
      numberOfPeople,
      tripId
    } = req.body;

    if (
      !customerEmail ||
      !customerPhone ||
      !numberOfPeople ||
      !tripId
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const trip = await Trip.findById(tripId);
    if(!trip){
      return res.status(400).json({message:"Trip not Found"});
    }


    if(trip.availableSeats < numberOfPeople){
      return res.status(400).json({message: "Number of people is more than the available seats"})
    }

    const newBooking = new Booking({
      customerName: req.user.name ,
      customerEmail,
      customerPhone,
      numberOfPeople,
      totalPrice: numberOfPeople * trip.price ,
      tripId: tripId,
      customerId: req.user.userId,
    });

    await newBooking.save();

    trip.availableSeats -= numberOfPeople;
    await trip.save();

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({
      message: "Error creating booking",
    });
  }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (
      status !== "pending" &&
      status !== "confirmed" &&
      status !== "cancelled"
    ) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({
      message: "Error updating booking status",
    });
  }
};

// Delete a booking
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting booking",
    });
  }
};
