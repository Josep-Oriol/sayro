import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado db");
  } catch (err) {
    console.error("Error al conectarse a la db: ", err.message);
    process.exit(1);
  }
};

export default connectDB;
