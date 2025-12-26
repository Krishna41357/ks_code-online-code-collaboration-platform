import express from 'express';
const router = express.Router();

import {
  register,
  login,
  googleAuth,
  getMe
} from '../controllers/authController.js';

import { protect } from '../middleware/authMiddleware.js';

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);

// Protected routes
router.get('/me', protect, getMe);

export default router;
