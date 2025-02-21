export { Ship, shipTypes };

const shipTypes = {
  carrier: 5,
  battleship: 4,
  submarine: 3,
  cruiser: 3,
  destroyer: 2,
};

class Ship {
  constructor(type) {
    (this.length = shipTypes[type]),
      (this.hits = 0),
      (this.sunk = false),
      (this.type = type);
  }

  hit() {
    this.hits++;
    this.sunk = this.isSunk();
  }

  isSunk() {
    if (this.hits >= this.length) return true;
    return false;
  }
}
