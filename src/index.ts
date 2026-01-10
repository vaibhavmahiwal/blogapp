import "dotenv/config";
import express from "express";

import cors from "cors";
import morgan from "morgan";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import { connectDB } from "./config/database.js";
import "./config/redis.js";



const app = express();
const port = process.env.PORT || 3000;
app.use(express.json()); // Parses JSON
app.use(express.urlencoded({ extended: true })); // Parses form-data text fields

// 1. GLOBAL MIDDLEWARE (Must come before routes)
app.use(cors());
app.use(morgan("dev"));

// 2. STATIC FOLDER (So you can view your uploaded images)
// This makes http://localhost:3000/uploads/your-image.jpg work
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// 3. ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 4. ERROR HANDLING (Must be at the very bottom)
app.use((err: any, req: any, res: any, next: any) => {
  console.error("🔥 Global Error Handler:", err.message);
  res.status(err.status || 500).json({ 
    message: err.message || "Internal Server Error",
    error: err 
  });
});

// 5. START SERVER & DB
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

connectDB()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection failed:", err));