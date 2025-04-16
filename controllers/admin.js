import { User } from "../models/user.js";

export const login = (req, res) => {
  const { secretKey } = req.body;

  if (!secretKey)
    return res.status(400).json({ msg: "Secret key is required!" });

  const key = "shahid";
  if (secretKey !== key) {
    return res.status(400).json({
      msg: "Wrong secret key!",
    });
  }
  return res.status(200).json({
    msg: "Welcome Admin!",
  });
};

export const getAllUsers = async (req, res) => {
  const users = await User.find({});
  if (!users || users.length === 0) {
    return res.status(404).json({
      msg: "No user found!",
    });
  }
  return res.status(200).json({
    users,
  });
};

export const searchUsers = async (req, res) => {
  const { ticketId, fullName, email } = req.query;

  const orConditions = [];

  if (ticketId) {
    orConditions.push({ ticketId: { $regex: ticketId, $options: "i" } });
  }
  if (fullName) {
    orConditions.push({ fullName: { $regex: fullName, $options: "i" } });
  }
  if (email) {
    orConditions.push({ email: { $regex: email, $options: "i" } });
  }

  if (!orConditions.length) {
    return res.status(400).json({ msg: "No search parameters provided." });
  }

  try {
    const users = await User.find({ $or: orConditions });

    if (!users.length) {
      return res.status(404).json({ msg: "No users found matching search." });
    }

    res.status(200).json({ users });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
