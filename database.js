import mongoose from "mongoose";

const connectionString = 'mongodb://localhost:27017/todolist';

export const connect = async () => {
    try{
        await mongoose.connect(connectionString);
        console.log('Connected to mongodb');
    } catch(err) {
        console.log('Connection error', err);
    }
}