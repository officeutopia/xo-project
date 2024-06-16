const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5500;

app.use(bodyParser.json());
app.use(cors());

app.post('/checkIfWin', function (req, res) {
  console.log('controller activated');
  const { board } = req.body;
  const result = checkIfWin(board);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});

function checkIfWin(board) {
  console.log('check win function');

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      console.log(`player ${board[a]} wins!`);
      return { win: true, line, full: false };
    }
  }

  const isFull = board.every((cell) => cell !== '');
  console.log('Board is full:', isFull);
  return { win: false, line: [], full: isFull };
}
