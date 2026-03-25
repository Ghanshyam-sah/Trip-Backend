import express from "express";
import {
  deleteProfile,
  getProfile,
  getUsers,
  updateProfile,
} from "../controllers/user.controller.js";
import { authorization } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users", authorization, getProfile);
router.delete("/users", authorization, deleteProfile);
router.patch("/users", authorization, updateProfile);

export default router;
