import { Gameboard } from "./gameboard";

export { Player };

class Player {
    constructor(type) {
        if (type !== 'real' && type !== 'computer') return;
        this.type = type,
        this.board = new Gameboard();
    }
}