import express from 'express';

import { employmodel } from './models/Schema.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const login= async (req, res) => {
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
        res.status(500).json({ message: "back" });
    }
};