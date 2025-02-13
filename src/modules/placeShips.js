import { loadMyBoard } from "./loadMyBoard.js";

export { placeShips };

const placeShips = (player) => {
    const availableShips = [5, 4, 3, 3, 2];

    const placementBoard = document.getElementById('placement-board');
    const confirmButton = document.getElementById('confirm');
    const h2 = document.querySelector('h2');

    h2.textContent = 'Please place your ships';

    loadMyBoard(player.board, 'placement-board');
    placementBoard.addEventListener('click', function addShip(e) {
        if (e.target.classList.contains('cell')) {
            const direction = prompt('Vertical or horizontal?');
            const shipLength = availableShips.shift();
            const xCoord = parseInt(e.target.dataset.x);
            const yCoord = parseInt(e.target.dataset.y);
            const validPlacement = player.board.placeShip(xCoord, yCoord, shipLength, direction);
            if (!validPlacement) {
                availableShips.unshift(shipLength);
                alert('Sorry admiral, no room to maneuver. Please provide new coordinates.')
            } else if (availableShips.length <= 0) {
                this.removeEventListener('click', addShip);
                confirmButton.style.display = 'block';
                confirmButton.disabled = false;
            };
            loadMyBoard(player.board, 'placement-board');
        }
    })
}