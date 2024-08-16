import express from 'express';
import cors from 'cors';
import gameRoutes from './Routes/gameRoutes.js';

const APP = express();
const PORT = 5500;

APP.use(express.json());
APP.use(cors());

APP.use('/', gameRoutes);

APP.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});
