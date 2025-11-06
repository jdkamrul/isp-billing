// Fix: Correctly import Express types to resolve type errors on req and res.
import { Request, Response } from 'express';

export const getDashboardStats = (req: Request, res: Response) => {
    // In a real app, this data would be aggregated from the database.
    const mockStats = {
        totalRevenue: 525000,
        newCustomers: 25,
        churnedCustomers: 5,
        activeSubscriptions: 450,
        arpu: 1166.67,
        topPackage: 'Fiber 100 Mbps',
        openTickets: 12,
    };
    res.json(mockStats);
};