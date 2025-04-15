import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, { dbName: "form" })
    .then((c) => console.log(`DB connected on host ${c.connection.host}`))
    .catch((err) => console.log(err));
};
