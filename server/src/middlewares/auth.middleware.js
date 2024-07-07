import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    console.log("incoming headers: ", req.headers);
    console.log("incoming cookies: ", req.cookies);

    const incomingToken =
      req.cookies.accessToken || req.headers.Authorization?.split(" ")[1];

    if (!incomingToken) {
      throw new ApiError(401, "Unauthorized request");
    }
    console.log("incoming token: ", incomingToken);

    const decodedToken = jwt.verify(
      incomingToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});
