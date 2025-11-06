import express from 'express';
import { getCustomers } from '../controllers/customerController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', protect, getCustomers);

export default router;
