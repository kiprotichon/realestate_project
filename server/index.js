import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { Sequelize } from "sequelize";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Setup Sequelize connection
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

// Test DB connection
try {
  await sequelize.authenticate();
  console.log("✅ Database connected successfully.");
} catch (error) {
  console.error("❌ Database connection failed:", error);
}

// Example API route
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is running!" });
});

// Serve frontend files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../public")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
