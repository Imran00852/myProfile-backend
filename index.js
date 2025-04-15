import express from "express";
import { config } from "dotenv";
import { connectDB } from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.js";

config({ path: "./.env" });
const app = express();
connectDB();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json({ limit: "100mb" }));
app.use(cookieParser());

app.use("/users", userRoutes);

//home route
app.get("/", (req, res) => {
  res.json({
    msg: "Home route!",
  });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
