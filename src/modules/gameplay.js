import { Player } from "./player.js";

const player1 = new Player('real');
const player2 = new Player('real');

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

console.log(player1.board.grid);
console.log(player1.board.ships.length);