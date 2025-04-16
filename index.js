import express from "express";
import { config } from "dotenv";
import { connectDB } from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.js";
import adminRoutes from "./routes/admin.js";

config({ path: "./.env" });
const app = express();
connectDB();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [process.env.FRONTEND_URI],
    credentials: true,
    allowedHeaders: ["*"],
  })
);

app.use(express.json({ limit: "100mb" }));
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/admin", adminRoutes);

//home route
app.get("/", (req, res) => {
  res.json({
    msg: "Home route!",
  });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
