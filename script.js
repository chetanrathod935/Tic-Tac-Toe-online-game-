document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  const resultScreen = document.getElementById('result-screen');
  const resultMessage = document.getElementById('result-message');
  const newGameBtn = document.getElementById('newGameBtn');
  let currentPlayer = 'X';
  const cells = Array.from({ length: 9 });

  const renderBoard = () => {
    board.innerHTML = '';
    cells.forEach((cell, index) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      cellElement.textContent = cell;
      cellElement.addEventListener('click', () => handleCellClick(index));
      board.appendChild(cellElement);
    });
  };

  const handleCellClick = (index) => {
    if (cells[index] || checkWinner()) return;
    cells[index] = currentPlayer;
    renderBoard();
    if (checkWinner()) {
      showResult(`Player ${currentPlayer} wins!`);
    } else if (checkDraw()) {
      showResult('It\'s a draw!');
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  };

  const checkWinner = () => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    return winningCombos.some(combo => {
      return combo.every(index => cells[index] === currentPlayer);
    });
  };

  const checkDraw = () => {
    return cells.every(cell => cell);
  };

  const showResult = (message) => {
    resultMessage.textContent = message;
    resultScreen.style.display = 'flex';
  };

  const resetGame = () => {
    cells.fill('');
    currentPlayer = 'X';
    renderBoard();
    resultScreen.style.display = 'none';
  };

  newGameBtn.addEventListener('click', resetGame);

  renderBoard();
});
