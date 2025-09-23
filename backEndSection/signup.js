
import { employmodel } from './models/Schema.js';
import bcrypt from "bcrypt";


export const signup= async (req, res) => {
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
};