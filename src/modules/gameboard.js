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

    placeShip(x, y, length, direction) {
        if (x < 0 || y < 0 || x > 9 || y > 9) return false;
        const ship = new Ship(length);
        if (direction === 'horizontal') {
            for (let i = x; i < ship.length + x; i++) {
                if (!this.grid[i][y]) return false;
                this.grid[i][y].ship = ship;
            }
        } else {
            for (let i = y; i < ship.length + y; i++) {
                if (!this.grid[x][i]) return false;
                this.grid[x][i].ship = ship;
            }
        }
    }
}
