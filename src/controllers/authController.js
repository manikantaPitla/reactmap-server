import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    throw new ApiError(400, "All fields are required");

  const existingUser = await User.findOne({ username });
  if (existingUser) throw new ApiError(409, "Username already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashedPassword });

  return res
    .status(201)
    .json(new ApiResponse(201, { username }, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    throw new ApiError(400, "Username and Password required");

  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = generateAccessToken(user._id);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { username, token }, "Login successful"));
});

export { registerUser, loginUser };
