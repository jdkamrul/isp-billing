// Fix: Correctly import Express types to resolve type errors.
import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './api';

dotenv.config();

// Fix: Explicitly type `app` as express.Express to help TypeScript resolve overloads correctly.
const app: express.Express = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));