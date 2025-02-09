export { Ship };

class Ship {
    constructor(length) {
        this.length = length,
        this.hits = 0,
        this.sunk = false
    }

    hit() {
        this.hits++;
    }

    isSunk() {
        if (this.hits >= this.length) return true;
        return false;
    }
}