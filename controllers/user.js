import { User } from "../models/user.js";
import cloudinary from "../config/cloudinary.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { fullName, email, capturedImg } = req.body;

  if (!fullName || !email || !capturedImg) {
    return res.status(400).json({
      msg: "fullName,email and image are required!",
    });
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({
      msg: "User already exists!",
    });
  }

  try {
    const uploadedImg = await cloudinary.uploader.upload(capturedImg, {
      folder: "user_imgs",
    });

    const user = await User.create({
      fullName,
      email,
      capturedImg: uploadedImg.secure_url,
    });

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res
      .status(201)
      .cookie("token", accessToken, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .json({
        msg: "User created sucessfully!",
      });
  } catch (err) {
    res.status(500).json({
      msg: "Something went wrong!",
    });
  }
};

export const userDetails = (req, res) => {
  return res.status(200).json({
    user: req.user,
  });
};
