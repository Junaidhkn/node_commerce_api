import express from 'express';
import { Request, Response } from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { protect } from './modules/auth';

const app = express();

dotenv.config();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
	res.status(200).json({ message: 'Hello World' });
});

app.use('/api', protect, router);

app.listen(8080, () => {
	console.log('Server is running on port localhost:8080');
});
