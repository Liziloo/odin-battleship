import { Gameboard } from "./gameboard.js";

export { Player };

class Player {
    constructor(type, name = 'HAL') {
        if (type !== 'real' && type !== 'computer') return;
        this.type = type,
        this.board = new Gameboard();
        this.name = name;
    }
}