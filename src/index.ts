import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get('/', (request: Request, response: Response) => {
  return response.status(200).json({ message: 'ok' });
});

app.post('/user', (request: Request, response: Response) => {
  const body = request.body;
  console.log(body);
  return response.status(201).json({ message: 'usuario criado' });
});

app.listen(5000, () => console.log('Server is running'));
