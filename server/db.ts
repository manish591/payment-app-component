import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;
const MONGO_DATABASE_NAME = process.env.MONGO_DATABASE_NAME;

async function connectDb() {
  try {
    await mongoose.connect(`${MONGO_URI}/${MONGO_DATABASE_NAME}`);
    console.log("Successfully connected with the database");
  } catch(err) {
    process.exit(1);
  }
}

export default connectDb;