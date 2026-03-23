import express from "express";
import {
  deleteBooking,
  addBooking,
  getBookigs,
  updateBookingStatus,
} from "../controllers/booking.controller.js";

const router = express.Router();

router.get("/booking", getBookigs);
router.post("/booking", addBooking);
router.patch("/booking/:id", updateBookingStatus);
router.delete("/booking/:id", deleteBooking);

export default router;
