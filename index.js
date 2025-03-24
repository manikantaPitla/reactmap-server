import dotenv from "dotenv";
import connectDatabase from "./src/db/index.js";
import { app } from "./app.js";

dotenv.config();

connectDatabase()
  .then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`✅ Server running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed!", err);
  });
