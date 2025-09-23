import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routes/userRoute.js';
import dotenv from 'dotenv';
import { employmodel, constomermodel,productmodel } from './models/Schema.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import router01 from './routes/registerRoute.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/user",router)
app.use("/api/register",router01)






app.post('/contact', async (req, res) => {
    try {
        const signup = await constomermodel.create(req.body);
        res.json(signup);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/addproduct', async (req, res) => {
    try {
        // Destructure the body to easily access and modify values
        const { name, description, imageUrl, price } = req.body;

        // Create an object with a guaranteed Number type for price
        const newProduct = {
            name,
            description,
            imageUrl,
            price: Number(price) // Explicitly convert price to a Number
        };

        const createdProduct = await productmodel.create(newProduct);
        res.status(201).json(createdProduct); // Use 201 status for successful creation

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
app.get('/api/products', async (req, res) => {
    try {
        const products = await productmodel.find();
        if (!products || products.length === 0) {
            return res.status(404).json({ msg: 'No products found' });
        }
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err.message);
        res.status(500).send('Server Error');
    }
});



mongoose.connect(process.env.mongodb_url)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
