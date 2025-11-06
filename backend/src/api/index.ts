import express from 'express';
import authRoutes from './authRoutes';
import dashboardRoutes from './dashboardRoutes';
import customerRoutes from './customerRoutes';
import mikrotikRoutes from './mikrotikRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/customers', customerRoutes);
router.use('/mikrotik', mikrotikRoutes);

router.get('/health', (req, res) => res.send('OK'));

export default router;
