import express from 'express';
import {
  getDeals,
  createDeal,
  updateDeal,
  deleteDeal
} from '../controllers/deal.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = express.Router();

router.use(requireAuth);
router.get('/', getDeals);
router.post('/', createDeal);
router.put('/:id', updateDeal);
router.delete('/:id', deleteDeal);

export default router;
