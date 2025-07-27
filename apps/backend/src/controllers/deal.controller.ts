import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getDeals = async (req: Request, res: Response) => {
  const deals = await prisma.deal.findMany({
    where: { organizationId: (req as any).user.organizationId }
  });
  res.json(deals);
};

export const createDeal = async (req: Request, res: Response) => {
  const deal = await prisma.deal.create({
    data: {
      ...req.body,
      organizationId: (req as any).user.organizationId
    }
  });
  res.status(201).json(deal);
};

export const updateDeal = async (req: Request, res: Response) => {
  const deal = await prisma.deal.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(deal);
};

export const deleteDeal = async (req: Request, res: Response) => {
  await prisma.deal.delete({ where: { id: req.params.id } });
  res.json({ message: 'Deal deleted' });
};
