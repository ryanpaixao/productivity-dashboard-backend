import express from 'express';
import dotenv from 'dotenv';

import { registerAuth, loginAuth } from '../controllers/authController.js';

dotenv.config();
const router = express.Router();

router.post('/register', registerAuth);
router.post('/login', loginAuth);

export default router;
