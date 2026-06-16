import express from "express";
import authRoutes from "./routes/auth.route.js";
import subsbcriberRoutes from "./routes/subscriber.route.js";
import blogRoutes from "./routes/blog.route.js";
import tripRoutes from "./routes/trip.route.js";
import bookingRoutes from "./routes/booking.route.js";
import userRoutes from "./routes/user.route.js";
import contactRoutes from "./routes/contact.route.js";
import { configDotenv } from "dotenv";
import { authorization } from "./middlewares/auth.middleware.js";
configDotenv();
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL || "http:/localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS", "PUT"],
    allowedHeaders: ["content-type", "Authorization"],
}))

app.use("/api/auth", authRoutes);
app.use("/api", subsbcriberRoutes);
app.use("/api", blogRoutes);
app.use("/api", bookingRoutes);
app.use("/api", tripRoutes);
app.use("/api", contactRoutes);
app.use("/api", userRoutes);

export default app;
