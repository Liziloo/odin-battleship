import { round } from './modules/round.js';
import { Player } from './modules/player.js';
import './styles/comeau-reset.css';
import './styles/styles.css';
import { loadWin } from './modules/loadWin.js';
import { computerAttack } from './modules/computerLogic.js';
import { placeShips } from './modules/placeShips.js';

const player1 = new Player('real');
const player2 = new Player('computer');

let currentPlayer = player1;
let otherPlayer = player2;

(function() {
    placeShips(currentPlayer);
    placeShips(otherPlayer);
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