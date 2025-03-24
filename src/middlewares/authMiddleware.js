import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler((req, _, next) => {
  const token = req.cookies.token;
  if (!token) throw new ApiError(401, "User not logged in");

  try {
    req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid token");
  }
});
