import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "https://king-prawn-app-y5pls.ondigitalocean.app" }));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

// Import and use routes
import authRoutes from "./routes/Auth";

app.use("/api/auth", authRoutes);

// Database Connection
mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));