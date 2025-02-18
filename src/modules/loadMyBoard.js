export { loadMyBoard }

const loadMyBoard = (board, divId) => {
    const boardDiv = document.getElementById(divId);
    boardDiv.textContent = '';

    for (let i = 0; i < board.grid.length; i++) {
        for (let j = 0; j < board.grid[i].length; j++) {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.dataset.x = i;
            cellDiv.dataset.y = j;
            if (board.grid[i][j].hit === true) {
                cellDiv.classList.add('hit');
            }
            if (board.grid[i][j].ship) {
                cellDiv.classList.add('ship');
                if (board.grid[i][j].ship.sunk === true) {
                    cellDiv.classList.add('sunk');
                }
            }
            boardDiv.appendChild(cellDiv);
        }
    }
    
}