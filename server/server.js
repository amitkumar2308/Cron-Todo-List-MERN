import express from 'express';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import cron from 'node-cron';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todos.js';
import Todo from './models/Todo.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: 'https://crontodo.vercel.app', // Restrict to your specific frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    credentials: true, // Include cookies and HTTP authentication with requests
}));

app.options('*', cors()); // Handle preflight requests

app.use(express.json());

// MongoDB connection
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};
connectToMongoDB();

// Routes
app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Cron job to send reminders
cron.schedule('0 9 * * *', async () => {  // Scheduled to run every day at 9AM
    try {
        // Ensure MongoDB connection is open
        if (mongoose.connection.readyState !== 1) {
            await connectToMongoDB();
        }

        const todos = await Todo.find({ deadline: { $lte: new Date() }, completed: false }).populate('user');
        for (const todo of todos) {
            await sendEmail(todo);
        }
    } catch (err) {
        console.error('Error sending reminders:', err);
    }
});

// Function to send email
const sendEmail = async (todo) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: todo.user.email,
            subject: 'Reminder: Your Task Deadline',
            text: `Reminder: Your task "${todo.task}" is due today.`
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${todo.user.email}`);
    } catch (err) {
        console.error('Error sending email:', err);
    }
};
