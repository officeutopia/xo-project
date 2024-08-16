// import express from 'express';
// import cors from 'cors';
// import pg from 'pg';

// const { Pool } = pg;
// const APP = express();
// const PORT = 5500;

// const LINES = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [2, 4, 6],
// ];

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'tictactoe',
//   password: 'taltulWants$',
//   port: 5433,
// });

// APP.use(express.json());
// APP.use(cors());

// APP.post('/checkIfWin', (req, res) => {
//   console.log('check if win activated');
//   const { board } = req.body;
//   const result = checkIfWin(board);
//   res.json(result);
// });

// APP.post('/computerMove', (req, res) => {
//   console.log('computer move activated');
//   const { board } = req.body;

//   const move = computerMove(board);
//   res.json({ move });
// });

// APP.get('/gameHistory', async (req, res) => {
//   try {
//     const result = await pool.query(
//       'SELECT * FROM game_results ORDER BY win_time DESC'
//     );
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Error retrieving game history:', err);
//     res
//       .status(500)
//       .json({ error: 'An error occurred while retrieving game history' });
//   }
// });

// APP.listen(PORT, () => {
//   console.log(`listening to ${PORT}`);
// });

// function checkIfWin(board) {
//   console.log('check win function');

//   for (let line of LINES) {
//     const [a, b, c] = line;
//     if (board[a] && board[a] === board[b] && board[a] === board[c]) {
//       console.log(board);
//       console.log(`player ${board[a]} wins!`);
//       saveGameResult(board[a]);
//       return { win: true, line, full: false };
//     }
//   }

//   const isFull = board.every((cell) => cell !== '');
//   console.log('Board is full:', isFull);
//   return { win: false, line: [], full: isFull };
// }

// function computerMove(board) {
//   const winningMove = findWinningMove(board, 'O');
//   if (winningMove !== null) return winningMove;

//   const blockingMove = findWinningMove(board, 'X');
//   if (blockingMove !== null) return blockingMove;

//   const emptySlots = [];
//   for (let i = 0; i < board.length; i++) {
//     if (board[i] === '') {
//       emptySlots.push(i);
//     }
//   }

//   if (emptySlots.length > 0) {
//     return emptySlots[Math.floor(Math.random() * emptySlots.length)];
//   }

//   return null;
// }

// function findWinningMove(board, player) {
//   for (let line of LINES) {
//     const [a, b, c] = line;
//     if (board[a] === player && board[b] === player && board[c] === '') return c;
//     if (board[a] === player && board[c] === player && board[b] === '') return b;
//     if (board[b] === player && board[c] === player && board[a] === '') return a;
//   }

//   return null;
// }

// async function saveGameResult(winner) {
//   const query = 'INSERT INTO game_results(winner) VALUES($1) RETURNING *';
//   try {
//     const res = await pool.query(query, [winner]);
//     console.log('Game result saved:', res.rows[0]);
//   } catch (err) {
//     console.error('Error saving game result:', err);
//   }
// }
