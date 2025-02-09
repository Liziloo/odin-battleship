import { Ship } from "./ship";

export { Gameboard };

class Gameboard {
    constructor() {
        this.grid = this.createGrid(),
        this.ships = [];
    }

    createGrid() {
        return Array(10).fill().map(() => Array(10).fill({hit: false, ship: null}));
    }

    placeShip(x, y, length, direction) {
        console.log(this.grid);
        if (x < 0 || y < 0 || x > 9 || y > 9 || x + length - 1 > 9 || y + length - 1 > 9) return false;
        
        // Make sure space not already occupied
        if (direction === 'horizontal') {
            for (let i = 0; i < length; i++) {
                if (this.grid[y][i + x].ship !== null) return false;
            }
        } else {
            for (let i = 0; i < length; i++) {
                if (this.grid[i + y][x].ship !== null) return false;
            }
        }

        const ship = new Ship(length);
        if (direction === 'horizontal') {
            for (let i = 0; i < length; i++) {
                this.grid[y][i + x].ship = ship;
            }
        } else {
            for (let i = y; i < length; i++) {
                this.grid[i + y][x].ship = ship;
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
}
