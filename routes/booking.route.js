import express from "express";
import {
  deleteBooking,
  addBooking,
  getBookigs,
  updateBookingStatus,
  getBookingsById,
  getMyBookings
} from "../controllers/booking.controller.js";
import {authorization} from "../middlewares/auth.middleware.js"

const router = express.Router();

router.get("/booking", authorization, getBookigs);
router.get("/booking/me", authorization, getMyBookings);
router.get("/booking/:id", authorization, getBookingsById);
router.post("/booking", authorization, addBooking);
router.patch("/booking/:id", authorization, updateBookingStatus);
router.delete("/booking/:id",authorization, deleteBooking);

export default router;
