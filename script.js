document.addEventListener('DOMContentLoaded', () => {
  const slots = document.querySelectorAll('td');
  const content = ['X', 'O'];
  let clickCount = 0;
  let turn = content[(clickCount + 1) % 2];
  let currentPlayer = document.getElementById('playerTurn');
  const button = document.getElementById('resetButton');
  let gameEnded = false;

  slots.forEach((slot) => {
    slot.addEventListener('click', () => {
      if (!gameEnded && slot.textContent === '') {
        slot.textContent = content[clickCount % 2];
        turn = content[(clickCount + 1) % 2];
        currentPlayer.textContent = `Player ${turn}'s turn`;
        clickCount++;
        checkIfWin();
      }
    });
  });

  button.addEventListener('click', () => {
    slots.forEach((slot) => {
      slot.textContent = '';
    });
    clickCount = 0;
    turn = content[clickCount % 2];
    currentPlayer.textContent = `Player ${turn}'s turn`;
    gameEnded = false;
  });

  function checkIfWin() {
    const board = Array.from(slots).map((slot) => slot.textContent);
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
        gameEnded = true;
        displayResult(board[a]);
        slots.forEach((slot) => slot.removeEventListener('click', () => {}));
        break;
      }
    }
  }

  function displayResult(winner) {
    console.log(`Player ${winner} wins!`);
    currentPlayer.textContent = `Player ${winner} wins!`;
  }
});
