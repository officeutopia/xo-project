document.addEventListener('DOMContentLoaded', () => {
  const SLOTS = Array.from(document.querySelectorAll('td'));
  const CONTENT = ['X', 'O'];
  let clickCount = 0;
  let turn = CONTENT[(clickCount + 1) % 2];
  const CURRENT_PLAYER = document.getElementById('playerTurn');
  const RESET_BUTTON = document.getElementById('resetButton');
  let gameOver = false;
  let board = updateBoard();
  let handlers = bindClickEvents(SLOTS);

  function updateBoard() {
    return Array.from(SLOTS).map((slot) => slot.textContent);
  }

  function bindClickEvents(SLOTS) {
    const handlers = SLOTS.map((slot) => {
      const handler = async () => {
        console.log(`click ${slot.id}`);
        // console.log(slot.id);

        if (!gameOver && slot.textContent === '') {
          await makeMove(slot);
          if (!gameOver) {
            await computerTurn();
          }
        }
      };
      slot.addEventListener('click', handler);
      return { handler, slot };
    });
    return handlers;
  }

  async function makeMove(slot) {
    slot.textContent = CONTENT[clickCount % 2];
    turn = CONTENT[(clickCount + 1) % 2];
    CURRENT_PLAYER.textContent = `Next Player ${turn}`;
    clickCount++;
    board = updateBoard();
    await checkIfWin();
  }

  async function computerTurn() {
    CURRENT_PLAYER.textContent = `Computer is thinking...`;
    try {
      const res = await fetch('http://localhost:5500/computerMove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ board }),
      });
      const { move } = await res.json();
      if (move !== null) {
        const SUSTAIN = 500;
        await new Promise((resolve) => setTimeout(resolve, SUSTAIN));
        await makeMove(SLOTS[move]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function checkIfWin() {
    try {
      const board = Array.from(SLOTS).map((slot) => slot.textContent);
      const res = await fetch('http://localhost:5500/checkIfWin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ board }),
      });
      const gameState = await res.json();
      resultStyle(board, gameState);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function resetGame() {
    bindClickEvents(SLOTS);
    SLOTS.forEach((slot) => {
      slot.textContent = '';
      slot.classList.remove('winning-slot', 'non-winning-slot');
    });
    board = updateBoard();
    clickCount = 0;
    CURRENT_PLAYER.classList.remove('victory');
    turn = CONTENT[clickCount % 2];
    CURRENT_PLAYER.textContent = ` Next Player ${turn}`;
    gameOver = false;
  }
  RESET_BUTTON.addEventListener('click', resetGame);

  function displayResult(result) {
    console.log(result);
    CURRENT_PLAYER.textContent = result;
    CURRENT_PLAYER.classList.add('victory');
  }

  function resultStyle(board, gameState) {
    if (gameState.win) {
      gameOver = true;
      const winner = board[gameState.line[0]];
      console.log(board);
      displayResult(`Player ${winner} wins!`);
      gameState.line.forEach((index) =>
        SLOTS[index].classList.add('winning-slot')
      );
      SLOTS.forEach((slot, index) => {
        if (!gameState.line.includes(index)) {
          slot.classList.add('non-winning-slot');
        }
      });

      handlers.forEach(({ handler, slot }) => {
        console.log('removing handler');
        slot.removeEventListener('click', handler);
      });
      // handlers = null;
      console.log('victory done.');
    } else if (gameState.full) {
      gameOver = true;
      displayResult(`It's a draw!`);
      CURRENT_PLAYER.classList.remove('victory');
    }
  }
});
