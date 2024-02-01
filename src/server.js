import app from './src/app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

console.log('Starting...');

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        app.listen(5000);
        console.log('Connected to database');
    } catch(err) {
        console.log(err);
    }
};

start();

