// Fix: Correctly import Express types to resolve type errors on req and res.
import { Request, Response } from 'express';

export const loginUser = (req: Request, res: Response) => {
    // In a real app, you would validate user from DB
    // and generate a real JWT token.
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
        res.json({
            message: 'Login successful',
            // This should be a real JWT in a production app
            token: 'fake-jwt-token-for-testing' 
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};