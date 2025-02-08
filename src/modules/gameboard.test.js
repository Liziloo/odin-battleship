import { Gameboard } from "./gameboard";
import { Ship } from "./ship";
import { expect, test } from '@jest/globals';

test('places new destroyer on grid', () => {
    const board = new Gameboard;
    board.placeShip(1, 3, 2);
    
    expect(board.grid[0][2]).toEqual({hit: false, ship: expect.any(Ship)});
    expect(board.grid[1][2]).toEqual({hit: false, ship: expect.any(Ship)});
})

test('places new submarine on grid', () => {
    const board = new Gameboard;
    board.placeShip(1, 3, 3);
    
    expect(board.grid[0][2]).toEqual({hit: false, ship: expect.any(Ship)});
    expect(board.grid[1][2]).toEqual({hit: false, ship: expect.any(Ship)});
    expect(board.grid[2][2]).toEqual({hit: false, ship: expect.any(Ship)});
})