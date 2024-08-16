import { checkWinCondition, findComputerMove } from '../Models/gameModel.js';

export const checkIfWin = (req, res) => {
  console.log('check if win activated');
  const { board } = req.body;
  const result = checkWinCondition(board);
  res.json(result);
};

export const computerMove = (req, res) => {
  console.log('computer move activated');
  const { board } = req.body;
  const move = findComputerMove(board);
  res.json({ move });
};

export const getGameHistory = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM game_results ORDER BY win_time DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error retrieving game history:', err);
    res
      .status(500)
      .json({ error: 'An error occurred while retrieving game history' });
  }
};
