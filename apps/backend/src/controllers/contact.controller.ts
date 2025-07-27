import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getContacts = async (req: Request, res: Response) => {
  const contacts = await prisma.contact.findMany({
    where: { organizationId: (req as any).user.organizationId },
  });
  res.json(contacts);
};

export const createContact = async (req: Request, res: Response) => {
  const contact = await prisma.contact.create({
    data: {
      ...req.body,
      organizationId: (req as any).user.organizationId
    }
  });
  res.status(201).json(contact);
};

export const updateContact = async (req: Request, res: Response) => {
  const contact = await prisma.contact.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.json(contact);
};

export const deleteContact = async (req: Request, res: Response) => {
  await prisma.contact.delete({ where: { id: req.params.id } });
  res.json({ message: 'Contact deleted' });
};
