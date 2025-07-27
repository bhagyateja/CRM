import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getUsers = async (_: Request, res: Response) => {
  const users = await prisma.user.findMany({ select: { id: true, email: true, role: true, isVerified: true } });
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({ where: { id: req.params.id } });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const user = await prisma.user.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  await prisma.user.delete({ where: { id: req.params.id } });
  res.json({ message: 'User deleted' });
};
