import { Ship } from "./ship";

export { Gameboard };

class Gameboard {
    constructor() {
        this.grid = this.createGrid(),
        this.ships = [];
    }

    createGrid() {
        return Array(10).fill(null).map(() => Array(10).fill({hit: false, ship: null}));
    }

    placeShip(x, y, length) {
        const ship = new Ship(length);
        for (let i = x - 1; i < ship.length + x - 1; i++) {
            this.grid[i][y].ship = ship;
        }
    }
}
