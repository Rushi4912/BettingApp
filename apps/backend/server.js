import express from 'express';

import router from './src/routes/index.route.js';


const app = express();
const port = process.env.port || 8080;

app.use(express.json());

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
