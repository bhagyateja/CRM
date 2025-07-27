import express from 'express';
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact
} from '../controllers/contact.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = express.Router();

router.use(requireAuth);
router.get('/', getContacts);
router.post('/', createContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

export default router;
