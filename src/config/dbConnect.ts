import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI ||"";

if (!MONGO_URI) {
  throw new Error("Please define MONGO_URI .env");
}

// Define the type for connection status
type ConnectionObject = {
  isConnected: number | null;
};

// This will store the connection status
const connection: ConnectionObject = {
  isConnected: null,
};

async function dbConnect(): Promise<void> {
  // If the database is already connected, no need to reconnect
  if (connection.isConnected) {
    console.log("DB Already Connected");
    return;
  }
  try {
    const db = await mongoose.connect(MONGO_URI);
    connection.isConnected = db.connections[0].readyState;
    console.log("DB Connected Successfully");
  } catch (error) {
    console.error("DB Connection Failed:", error);
    process.exit(1);  // Exit process on DB connection failure
  }
}

export default dbConnect;
