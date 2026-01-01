import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const seedUser = async () => {
    try {
        await User.deleteMany();

        const createdUser = await User.create({
            name: "Mo mamy",
            password: "password123",
            bus_id: "BUS-123",
            notifications_enabled: true,
            dark_mode: false,
        });

        console.log("User Seeded:", createdUser);
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedUser();
