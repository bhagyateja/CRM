import { Request, Response } from 'express';
import { generateToken } from '../utils/jwt';
import bcrypt from 'bcrypt';
import prisma from '../utils/prisma'
import { sendOTP } from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  const { email, phone, password, organizationName, role } = req.body;
  if (!email && !phone) return res.status(400).json({ message: 'Email or phone is required' });

  const hash = await bcrypt.hash(password, 10);

  const org = await prisma.organization.create({
    data: {
      name: organizationName || 'Untitled Org',
      users: {
        create: {
          email,
          phone,
          passwordHash: hash,
          role,
        }
      }
    },
    include: {
    users: true,
  }
  });

  await sendOTP(email || phone, org.users[0].id, email ? 'email' : 'phone');

  res.status(201).json({ message: 'Registered. OTP sent for verification.' });
};

export const login = async (req: Request, res: Response) => {
  const { email, phone, password } = req.body;
  const user = await prisma.user.findFirst({ where: { OR: [{ email }, { phone }] } });

  if (!user) return res.status(401).json({ message: 'User not found' });

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(401).json({ message: 'Invalid password' });

  if (!user.isVerified) return res.status(403).json({ message: 'Please verify your account via OTP' });

  const token = generateToken(user.id, user.role);
  res.json({ token });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email, phone } = req.body;
  const user = await prisma.user.findFirst({ where: { OR: [{ email }, { phone }] } });
  if (!user) return res.status(404).json({ message: 'User not found' });

  await sendOTP(email || phone, user.id, email ? 'email' : 'phone');

  res.json({ message: 'OTP sent for password reset' });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { otp, newPassword, target } = req.body;

  const record = await prisma.oTP.findFirst({
    where: { code: otp, target, used: false, expiresAt: { gt: new Date() } },
    include: { user: true }
  });

  if (!record) return res.status(400).json({ message: 'Invalid or expired OTP' });

  const hash = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: record.userId },
    data: { passwordHash: hash, isVerified: true }
  });

  await prisma.oTP.update({ where: { id: record.id }, data: { used: true } });

  res.json({ message: 'Password reset successful' });
};

export const verifyOTP = async (req: Request, res: Response) => {
  const { otp, target } = req.body;

  const record = await prisma.oTP.findFirst({
    where: { code: otp, target, used: false, expiresAt: { gt: new Date() } },
    include: { user: true }
  });

  if (!record) return res.status(400).json({ message: 'Invalid or expired OTP' });

  await prisma.user.update({ where: { id: record.userId }, data: { isVerified: true } });
  await prisma.oTP.update({ where: { id: record.id }, data: { used: true } });

  res.json({ message: 'Account verified successfully' });
};
