import { Ship } from "./ship.js";

export { Gameboard };

class Gameboard {
    constructor() {
        this.grid = this.createGrid(),
        this.ships = []
    }

    createGrid() {
        const grid = [];
        for (let i = 0; i < 10; i++) {
            grid[i] = [];
            for (let j = 0; j < 10; j++) {
                const cell = {hit: false, ship: null};
                grid[i][j] = cell;
            }
        }
        return grid;
    }

    placeShip(x, y, length, direction) {
        if (x < 0 || y < 0 || x > 9 || y > 9) return false;
        
        // Make sure space not already occupied
        if (direction === 'horizontal') {
            if (x + length - 1 > 9) return false;
            for (let i = 0; i < length; i++) {
                if (this.grid[i + x][y].ship !== null) return false;
            }
        } else {
            if (y + length - 1 > 9) return false;
            for (let i = 0; i < length; i++) {
                if (this.grid[x][i + y].ship !== null) return false;
            }
        }

        const ship = new Ship(length);
        if (direction === 'horizontal') {
            for (let i = 0; i < length; i++) {
                this.grid[i + x][y].ship = ship;
            }
        } else {
            for (let i = 0; i < length; i++) {
                this.grid[x][i + y].ship = ship;
            }
        }
        this.ships.push(ship);
        return true;
    }

    receiveAttack(x, y) {
        if (x < 0 || x > 9 || y < 0 || y > 9) return false;
        if (this.grid[x][y].hit === true) return false;
        this.grid[x][y].hit = true;
        if (this.grid[x][y].ship) {
            this.grid[x][y].ship.hit();
        }
        return true;
    }

    allSunk() {
        for (let ship of this.ships) {
            if (ship.sunk === false) return false;
        }
        return true;
    }
}
