import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import dotenv from 'dotenv';
import { employmodel, constomermodel } from './models/Employ.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());



app.post('/contact', async (req, res) => {
    try {
        const signup = await constomermodel.create(req.body);
        res.json(signup);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const user = await employmodel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Email or Password is incorrect" });
        }

        const accessToken = jwt.sign(
            {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            accessToken,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        res.status(500).json({ message: "chekka" });
    }
});

app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        
        const existingUser = await employmodel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        
        const hashPassword = await bcrypt.hash(password, 10);

      
        const newUser = await employmodel.create({
            name,
            email,
            password: hashPassword
        });

        return res.status(201).json({
            message: "User created successfully",
            user: newUser
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




mongoose.connect(process.env.mongodb_url)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
