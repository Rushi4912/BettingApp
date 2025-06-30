import express from 'express';
import router from './src/routes/index.route.js';
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

// app.get('/users', async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.json(users);
// });

// app.post('/users', async (req, res) => {
//   const { id, username, email } = req.body;

//   // Simple validation
//   if (!username || !email) {
//     return res.status(400).json({ message: 'Username and email are required' });
//   }

//   try {
//     const user = await prisma.user.create({
//       data: {
//         id, // optional - remove if auto-generated
//         username,
//         email,
//       },
//     });
//     res.status(201).json(user); // success response
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({
//       message: 'Something went wrong with inputs',
//       error: error.message,
//     });
//   }
// });

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
