import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    const { connection } = await mongoose.connect(
      process.env.NEXT_PUBLIC_MONGODB
    );

    if (connection.readyState === 1) {
      console.log("Connected to Database ");
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connectMongo;
