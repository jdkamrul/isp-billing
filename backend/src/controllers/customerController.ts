// Fix: Correctly import Express types to resolve type errors on req and res.
import { Request, Response } from 'express';

export const getCustomers = (req: Request, res: Response) => {
    // In a real app, you would fetch this from the database.
    const mockCustomers = [
      { id: 'CUST001', name: 'John Doe', email: 'john.doe@example.com', status: 'active' },
      { id: 'CUST002', name: 'Jane Smith', email: 'jane.smith@example.com', status: 'active' },
    ];
    res.json(mockCustomers);
};