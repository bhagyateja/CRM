import { Request, Response, NextFunction } from 'express';

export const requireRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if ((req as any).user?.role !== role) return res.status(403).send('Access denied');
    next();
  };
};
