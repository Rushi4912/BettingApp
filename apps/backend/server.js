import express from 'express';
import { PrismaClient } from '@prisma/client';
import router from './src/routes/index.route';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.use('/api', router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: { code: 'INTERNAL_SERVER_ERROR', message: 'Something went wrong' },
  });
});

app.listen(8080, () => {
  console.log('Server is listening on port 8080');
});
