import express from 'express';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import cron from 'node-cron';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todos.js';
import Todo from './models/Todo.js'; // Import Todo model
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: '*',  // Allow requests from all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization']  // Specify allowed headers
}));

app.use(express.json());

// MongoDB connection using URI from environment variables
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Cron job to send reminders
cron.schedule('0 9 * * *', async () => {  // Runs everyday 9AM 
    try {
        const todos = await Todo.find({ deadline: { $lte: new Date() }, completed: false }).populate('user');
        todos.forEach(async (todo) => {
            await sendEmail(todo);
        });
    } catch (err) {
        console.error('Error sending reminders:', err);
    }
});

// Function to send email
const sendEmail = async (todo) => {
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
};
