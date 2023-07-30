import express from 'express';
import { Request, Response } from 'express';
import router from './router';

const app = express();

app.get('/', (req: Request, res: Response) => {
	res.status(200).json({ message: 'Hello World' });
});

app.use('/api', router);

app.listen(8080, () => {
	console.log('Server is running on port localhost:8080');
});
