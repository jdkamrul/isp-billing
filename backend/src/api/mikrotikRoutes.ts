import express from 'express';
import { getServers } from '../controllers/mikrotikController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/servers', protect, getServers);

export default router;
