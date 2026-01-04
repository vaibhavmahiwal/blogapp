import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/database.js";
import cors from "cors";
import morgan from "morgan";
import blogRoutes from "./routes/blogRoutes.js"
import "./config/redis.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));

// Middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

// Swagger documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs",blogRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Database connection
connectDB()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

