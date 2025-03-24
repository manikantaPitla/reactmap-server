import express from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verifyJWT, (_, res) => {
  res.json({ center: { lat: 20.5937, lng: 78.9629 }, zoom: 5 });
});

export default router;
