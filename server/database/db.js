import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://tahasaleemprofessnal:a0IGVg9KT2QXKzVd@cluster0.mogus.mongodb.net/coursera-lms?retryWrites=true&w=majority&appName=Cluster0");
        console.log('MongoDB Connected');
    } catch (error) {
        console.log("error occured", error);
    }
}
export default connectDB;