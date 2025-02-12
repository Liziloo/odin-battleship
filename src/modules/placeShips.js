export { placeShips };

const placeShips = (player1, player2) => {
    if (player1.type === 'real') {
        const h2 = document.querySelector('h2');
        h2.textContent = 'Please place your ships';
    }
    const boardDiv = document.querySelector('.my-board');
    boardDiv.textContent = '';

    for (let i = 0; i < player1.board.grid.length; i++) {
        for (let j = 0; j < player1.board.grid[i].length; j++) {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.dataset.x = i;
            cellDiv.dataset.y = j;
            boardDiv.appendChild(cellDiv);
        }
    }
    const availableShips = [5, 4, 3, 3, 2];
    boardDiv.addEventListener('click', function addShip(e) {
        if (e.target.classList.contains('cell') && availableShips.length > 0) {
            const direction = prompt('Vertical or horizontal?');
            const length = availableShips.shift();
            const xCoord = parseInt(e.target.dataset.x);
            const yCoord = parseInt(e.target.dataset.y);
            player1.board.placeShip(xCoord, yCoord, length, direction);
        };
        if (availableShips.length <= 0) {
            this.removeEventListener('click', addShip);
        }
        refreshBoard();
    })

    const refreshBoard = () => {
        boardDiv.textContent = '';

        for (let i = 0; i < player1.board.grid.length; i++) {
            for (let j = 0; j < player1.board.grid[i].length; j++) {
                const cellDiv = document.createElement('div');
                cellDiv.classList.add('cell');
                cellDiv.dataset.x = i;
                cellDiv.dataset.y = j;
                if (player1.board.grid[i][j].ship) {
                    cellDiv.classList.add('ship');
                }
                boardDiv.appendChild(cellDiv);
            }
        }
    }
}