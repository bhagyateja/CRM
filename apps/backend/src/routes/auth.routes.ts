import express from 'express';
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyOTP,
} from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/verify-otp', verifyOTP);

export default router;
