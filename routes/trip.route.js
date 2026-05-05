import express from "express";
import {
  addTrip,
  getTripById,
  deleteTrip,
  getTrips,
  updateTrip,
} from "../controllers/trip.controller.js";
import {authorization} from "../middlewares/auth.middleware.js"

const router = express.Router();

router.get("/trips", authorization, getTrips);
router.get("/trips/:id", authorization, getTripById);
router.post("/trips", authorization, addTrip);
router.patch("/trips/:id", authorization, updateTrip);
router.delete("/trips/:id", authorization, deleteTrip);

export default router;
