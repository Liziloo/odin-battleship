import { placeShips } from './modules/placeShips.js';

const player1 = new Player('real');
const player2 = new Player('computer');

let currentPlayer = player1;
let otherPlayer = player2;

(function() {
    const player1 = placeShips();
})();