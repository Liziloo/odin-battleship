import { round } from './modules/round.js';
import { Player } from './modules/player.js';
import './styles/comeau-reset.css';
import './styles/styles.css';

const player1 = new Player('real');
const player2 = new Player('real');

// Place all ships for both players
// Patrol boats
player1.board.placeShip(0, 0, 2, 'horizontal');
player1.board.placeShip(0, 1, 2, 'horizontal');
player1.board.placeShip(0, 2, 2, 'horizontal');
player1.board.placeShip(0, 3, 2, 'horizontal');
player1.board.placeShip(0, 4, 2, 'horizontal');

player2.board.placeShip(0, 0, 2, 'horizontal');
player2.board.placeShip(0, 1, 2, 'horizontal');
player2.board.placeShip(0, 2, 2, 'horizontal');
player2.board.placeShip(0, 3, 2, 'horizontal');
player2.board.placeShip(0, 4, 2, 'horizontal');

// Submarines
player1.board.placeShip(0, 5, 3, 'horizontal');
player1.board.placeShip(0, 6, 3, 'horizontal');
player1.board.placeShip(0, 7, 3, 'horizontal');
player1.board.placeShip(0, 8, 3, 'horizontal');

player2.board.placeShip(0, 5, 3, 'horizontal');
player2.board.placeShip(0, 6, 3, 'horizontal');
player2.board.placeShip(0, 7, 3, 'horizontal');
player2.board.placeShip(0, 8, 3, 'horizontal');

// Destroyers
player1.board.placeShip(0, 9, 3, 'horizontal');
player1.board.placeShip(2, 0, 3, 'horizontal');
player1.board.placeShip(2, 1, 3, 'horizontal');

player2.board.placeShip(0, 9, 3, 'horizontal');
player2.board.placeShip(2, 0, 3, 'horizontal');
player2.board.placeShip(2, 1, 3, 'horizontal');

// Battleships
player1.board.placeShip(2, 2, 4, 'horizontal');
player1.board.placeShip(2, 3, 4, 'horizontal');

player2.board.placeShip(2, 2, 4, 'horizontal');
player2.board.placeShip(2, 3, 4, 'horizontal');

// Carriers
player1.board.placeShip(2, 4, 5, 'horizontal');

player2.board.placeShip(2, 4, 5, 'horizontal');

let currentPlayer = player1;

(function() {
    const boardDiv = document.querySelector('.board');
    boardDiv.addEventListener('click', (e) => {
        const xCoord = e.target.dataset.x;
        const yCoord = e.target.dataset.y;
        currentPlayer.board.receiveAttack(xCoord, yCoord);
        const finished = currentPlayer.board.allSunk();
        if (!finished) {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            round(currentPlayer);
        }
    })
    round(currentPlayer);
})();