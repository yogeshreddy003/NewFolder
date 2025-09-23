import express from 'express';
import { signup } from '../signup.js';
const router01=express.Router();
router01.post('/signup',signup)
export default router01;