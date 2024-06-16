document.addEventListener('DOMContentLoaded', () => {
  const slots = document.querySelectorAll('td');
  const content = ['X', 'O'];
  let clickCount = 0;
  let turn = content[(clickCount + 1) % 2];
  const currentPlayer = document.getElementById('playerTurn');
  const resetButton = document.getElementById('resetButton');
  let gameEnded = false;

  slots.forEach((slot) => {
    slot.addEventListener('click', async () => {
      console.log('click');

      if (!gameEnded && slot.textContent === '') {
        slot.textContent = content[clickCount % 2];
        turn = content[(clickCount + 1) % 2];
        currentPlayer.textContent = `Next Player ${turn}`;
        clickCount++;
        await checkIfWin();
      }
    });
  });
  resetButton.addEventListener('click', () => {
    slots.forEach((slot) => {
      slot.textContent = '';
      slot.classList.remove('winning-slot', 'non-winning-slot');
    });
    clickCount = 0;
    currentPlayer.classList.remove('victory');
    turn = content[clickCount % 2];
    currentPlayer.textContent = ` Next Player ${turn}`;
    gameEnded = false;
  });

  async function checkIfWin() {
    try {
      const board = Array.from(slots).map((slot) => slot.textContent);
      const res = await fetch('http://localhost:5500/checkIfWin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ board }),
      });
      const data = await res.json();
      if (data.win) {
        gameEnded = true;
        const winner = board[data.line[0]];
        displayResult(`Player ${winner} wins!`);
        data.line.forEach((index) =>
          slots[index].classList.add('winning-slot')
        );
        slots.forEach((slot, index) => {
          if (!data.line.includes(index)) {
            slot.classList.add('non-winning-slot');
          }
        });
        slots.forEach((slot) =>
          slot.removeEventListener('click', async () => {})
        );
      } else if (data.full) {
        gameEnded = true;
        displayResult(`It's a draw!`);
        currentPlayer.classList.remove('victory');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function displayResult(result) {
    console.log(result);
    currentPlayer.textContent = result;
    currentPlayer.classList.add('victory');
  }
});
