import { randomCoord } from "./computerLogic.js";

export { placeShips };

const placeShips = (player) => {
    const boardDiv = document.querySelector('.my-board');
    const availableShips = [5, 4, 3, 3, 2];

    if (player.type === 'real') {
        boardDiv.textContent = '';
        const h2 = document.querySelector('h2');
        h2.textContent = 'Please place your ships';

        const instructionsDiv = document.querySelector('.instructions');
        instructionsDiv.textContent = 'For each of your ships in turn, click on the grid square where you would like to place the bow of the ship. When prompted, indicate whether the ship should be placed vertically or horizontally.'

        for (let i = 0; i < player.board.grid.length; i++) {
            for (let j = 0; j < player.board.grid[i].length; j++) {
                const cellDiv = document.createElement('div');
                cellDiv.classList.add('cell');
                cellDiv.dataset.x = i;
                cellDiv.dataset.y = j;
                boardDiv.appendChild(cellDiv);
            }
        }

        boardDiv.addEventListener('click', function addShip(e) {
            if (e.target.classList.contains('cell') && availableShips.length > 0) {
                const direction = prompt('Vertical or horizontal?');
                const length = availableShips.shift();
                const xCoord = parseInt(e.target.dataset.x);
                const yCoord = parseInt(e.target.dataset.y);
                const validPlacement = player.board.placeShip(xCoord, yCoord, length, direction);
                if (!validPlacement) {
                    availableShips.unshift(length);
                    alert('Invalid ship placement. Please try again.')
                }
            };
            refreshBoard();
            if (availableShips.length <= 0) {
                this.removeEventListener('click', addShip);
                alert('Wait for the computer to place its ships.')
                instructionsDiv.textContent = '';
            }
        })
    } else {
        for (let ship of availableShips) {
            let validPlacement = false;
            const directions = ['vertical', 'horizontal'];
            while (!validPlacement) {
                const xCoord = randomCoord();
                const yCoord = randomCoord();
                const direction = directions[Math.floor(Math.random() * 2)];
                validPlacement = player.board.placeShip(xCoord, yCoord, ship, direction);
            }
        }
    }

    const refreshBoard = () => {
        boardDiv.textContent = '';

        for (let i = 0; i < player.board.grid.length; i++) {
            for (let j = 0; j < player.board.grid[i].length; j++) {
                const cellDiv = document.createElement('div');
                cellDiv.classList.add('cell');
                cellDiv.dataset.x = i;
                cellDiv.dataset.y = j;
                if (player.board.grid[i][j].ship) {
                    cellDiv.classList.add('ship');
                }
                boardDiv.appendChild(cellDiv);
            }
        }
    }
}