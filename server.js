import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import profileRoutes from "./routes/profileRoute.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api", profileRoutes);

app.get("/", (req, res) => res.send("welcome to my api"));
app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
