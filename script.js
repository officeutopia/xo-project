document.addEventListener('DOMContentLoaded', () => {
  const slots = document.querySelectorAll('td');
  const content = ['X', 'O'];
  let clickCount = 0;
  let turn = content[(clickCount + 1) % 2];
  let currentPlayer = document.getElementById('playerTurn');
  const button = document.getElementById('resetButton');

  slots.forEach((slot) => {
    slot.addEventListener('click', () => {
      if (slot.textContent === '') {
        slot.textContent = content[clickCount % 2];
        turn = content[(clickCount + 1) % 2];
        currentPlayer.textContent = `Player ${turn}'s turn`;
      }
      clickCount++;
    });
  });

  button.addEventListener('click', () => {
    slots.forEach((slot) => {
      slot.textContent = '';
    });
    clickCount = 0;
    turn = content[clickCount % 2];
    currentPlayer.textContent = `Player ${turn}'s turn`;
  });
  //   const tableSLots = document.querySelectorAll('table');
  //   const ids = array.from (tableSLots).map()
  //   function checkIfWin () {

  //   }
});
// [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//   ]
