export { loadEnemyBoard };

const loadEnemyBoard = (playerBoard) => {
    const boardDiv = document.querySelector('.enemy-board');
    for (let i = 0; i < playerBoard.grid.length; i++) {
        for (let j = 0; j < playerBoard.grid[i].length; j++) {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.dataset.x = i;
            cellDiv.dataset.y = j;
            if (playerBoard.grid[i][j].hit === true) {
                cellDiv.classList.add('hit');
            }
            if (playerBoard.grid[i][j].ship) {
                cellDiv.classList.add('enemy-ship');
                
                if (playerBoard.grid[i][j].ship.sunk === true) {
                    cellDiv.classList.add('sunk');
                }
            }
            boardDiv.appendChild(cellDiv);
        }
    }
}