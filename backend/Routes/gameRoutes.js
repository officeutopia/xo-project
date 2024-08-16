import express from 'express';
import {
  checkIfWin,
  computerMove,
  getGameHistory,
} from '../controllers/gameController.js';

const router = express.Router();

router.post('/checkIfWin', checkIfWin);
router.post('/computerMove', computerMove);
router.get('/gameHistory', getGameHistory);

export default router;
