import { Gameboard } from "./gameboard";
import { Player } from "./player";
import { expect, test } from '@jest/globals';


test('creates Gameboard for new player', () => {
    const player1 = new Player('real');
    const player2 = new Player('computer');

    expect(player1.board).toBeInstanceOf(Gameboard);
    expect(player2.board).toBeInstanceOf(Gameboard);
})

test('allows only "real" and "computer" as player types', () => {
    const player1 = new Player('real');
    const player2 = new Player('computer');
    const player3 = new Player('cat');
    const player4 = new Player(true);

    expect(player1).toBeInstanceOf(Player);
    expect(player2).toBeInstanceOf(Player);
    expect(player3).toBeFalsy;
    expect(player4).toBeFalsy;
})