import { PrismaClient } from '@prisma/client';
import { sendMail } from '../config/mailer';
import { generateOTP } from './captcha.service';

const prisma = new PrismaClient();

export const sendOTP = async (target: string, userId: string, type: 'email' | 'phone') => {
  const code = generateOTP();
  const expires = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.oTP.create({
    data: {
      code,
      target,
      type,
      userId,
      expiresAt: expires,
    }
  });

  await sendMail(
  target,
  'Your OTP Code - CRM Account Verification',
  `
  Hi,

  Thank you for registering with the CRM Application! 🎉  
  To complete your registration, please use the One-Time Password (OTP) below:

  🔐 **Your OTP Code:** ${code}

  This code is valid for the next 10 minutes. Do not share this code with anyone.
  If you did not request this, please ignore this email or contact our support team.

  Best regards,  
  CRM Team 
`
);

};
