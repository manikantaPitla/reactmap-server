import express from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verifyJWT, (_, res) => {
  res.json({
    message: "Dashboard data",
    cards: [
      { id: 1, title: "Card 1" },
      { id: 2, title: "Card 2" },
    ],
  });
});

export default router;
