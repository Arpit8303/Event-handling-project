import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "colors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.Routes.js";
import userRoutes from "./routes/user.Routes.js";
import eventRoutes from "./routes/event.Routes.js";
import registrationRoutes from "./routes/registration.Routes.js";
import adminRoutes from "./routes/admin.Routes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/admin", adminRoutes);
app.use(errorMiddleware);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`.bgGreen.bold);
  });
};

if (process.env.NODE_ENV !== "test") {
  startServer();
}

export default app;