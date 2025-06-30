import express from 'express';
import { PrismaClient } from '@prisma/client';
// import router from './src/routes/index.route.js';

const prisma = new PrismaClient();
const app = express();
const port = process.env.port || 8080;

app.use(express.json());

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post('/users', async (req, res) => {
 const {id,username, email}  = req.body;

    try{
      const user = await prisma.user.create({
        data: {
          id,
          username,
          email,
        },
      });

      res.json({
        user,
      })

    }catch(error){

       console.error(error);
    }
});

// app.use('/api', router);

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     error: { code: 'INTERNAL_SERVER_ERROR', message: 'Something went wrong' },
//   });
// });

app.listen(port, () => {
  console.log('Server is listening on port 8080');
});
