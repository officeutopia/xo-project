// document.addEventListener('DOMContentLoaded', () => {
//   const slots = document.querySelectorAll('td');
//   const content = ['X', 'O'];
//   let clickCount = 0;
//   let turn = content[(clickCount + 1) % 2];
//   const currentPlayer = document.getElementById('playerTurn');
//   const resetButton = document.getElementById('resetButton');
//   let gameEnded = false;

//   slots.forEach((slot) => {
//     slot.addEventListener('click', () => {
//       console.log('click');

//       if (!gameEnded && slot.textContent === '') {
//         slot.textContent = content[clickCount % 2];
//         turn = content[(clickCount + 1) % 2];
//         currentPlayer.textContent = `Next Player ${turn}`;
//         clickCount++;
//         checkIfWin();
//       }
//     });
//   });
//   resetButton.addEventListener('click', () => {
//     slots.forEach((slot) => {
//       slot.textContent = '';
//       slot.classList.remove('winning-slot', 'non-winning-slot');
//     });
//     clickCount = 0;
//     currentPlayer.classList.remove('victory');
//     turn = content[clickCount % 2];
//     currentPlayer.textContent = ` Next Player ${turn}`;
//     gameEnded = false;
//   });

//   function checkIfWin() {
//     console.log('check win');
//     const board = Array.from(slots).map((slot) => slot.textContent);
//     const lines = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//       [0, 4, 8],
//       [2, 4, 6],
//     ];

//     for (let line of lines) {
//       const [a, b, c] = line;
//       if (board[a] && board[a] === board[b] && board[a] === board[c]) {
//         gameEnded = true;
//         displayResult(board[a]);
//         slots[a].classList.add('winning-slot');
//         slots[b].classList.add('winning-slot');
//         slots[c].classList.add('winning-slot');
//         slots.forEach((slot, index) => {
//           if (!line.includes(index)) {
//             slot.classList.add('non-winning-slot');
//           }
//         });
//         slots.forEach((slot) => slot.removeEventListener('click', () => {}));
//         break;
//       }
//     }
//   }

//   async function checkWinBackend() {
//     const res = await fetch('http://127.0.0.1:5500/frontend/index.html');
//     const data = await res.json();
//     console.log(data);
//   }

//   function displayResult(winner) {
//     console.log(`Player ${winner} wins!`);
//     currentPlayer.textContent = `Player ${winner} wins!`;
//     currentPlayer.classList.add('victory');
//   }
// });
