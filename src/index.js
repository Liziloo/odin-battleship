import { round } from './modules/round.js';
import { Player } from './modules/player.js';
import './styles/comeau-reset.css';
import './styles/styles.css';
import { loadWin } from './modules/loadWin.js';
import { computerAttack } from './modules/computerLogic.js';

const player1 = new Player('real');
const player2 = new Player('computer');

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
let otherPlayer = player2;

(function() {
    round(currentPlayer, otherPlayer);
    const enemyBoardDiv = document.querySelector('.enemy-board');
    enemyBoardDiv.addEventListener('click', (e) => {
        if (e.target.classList.contains('cell')) {
            const xCoord = e.target.dataset.x;
            const yCoord = e.target.dataset.y;
            otherPlayer.board.receiveAttack(xCoord, yCoord);
            if (otherPlayer.board.grid[xCoord][yCoord].ship !== null) {
                alert("It's a hit!")
            } else {
                alert("“Giving up is the only sure way to fail.”")
            }
            const finished = otherPlayer.board.allSunk();
            if (!finished) {
                if (currentPlayer.type === 'real' && otherPlayer.type === 'real') {
                    currentPlayer = currentPlayer === player1 ? player2 : player1;
                    otherPlayer = otherPlayer === player1 ? player2 : player1;
                    round(currentPlayer, otherPlayer);
                } else {
                    const result = computerAttack(currentPlayer.board);
                    round(currentPlayer, otherPlayer);
                    if (result === 'hit') {
                        alert("You've been hit!");
                    } else {
                        alert("Evasion effective!")
                    }
                }
            } else {
                loadWin();
            }
        }
       
    })
})();