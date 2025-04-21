import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    capturedImg: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
