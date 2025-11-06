// Fix: Correctly import Express types to resolve type errors on req and res.
import { Request, Response } from 'express';

export const getServers = (req: Request, res: Response) => {
    // In a real app, you would fetch this from the database.
    const mockServers = [
        { id: 'MKT001', name: 'Main POP', host: '192.168.88.1', status: 'active' },
        { id: 'MKT002', name: 'Branch Office 1', host: 'router.branch1.isp.com', status: 'active' },
    ];
    res.json(mockServers);
};