require("dotenv").config();
import mongoose from "mongoose";

const connection = {};
const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION;
export async function dbConnection() {
    if (connection.isConnected) {
        console.log(" 🛢 Already connected to database");
        return;
    }

    try {
        const db = await mongoose.connect(MONGODB_CONNECTION || "");

        connection.isConnected = db.connections[0].readyState;
        console.log(`🛢   Database has been connected successfully`);
    } catch (error) {
        console.log("Database connection failed", error);

        process.exit(1);
    }
}