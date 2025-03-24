import mongoose from "mongoose";

async function connectDatabase() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/reactmap-server`);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ Database connection failed", error);
    process.exit(1);
  }
}

export default connectDatabase;
