import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/authRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";
import mapRoutes from "./src/routes/mapRoutes.js";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/map", mapRoutes);

export { app };
