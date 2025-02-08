import { Gameboard } from "./gameboard";
import { Ship } from "./ship";
import { expect, test } from '@jest/globals';


test('places new destroyer on grid', () => {
    const board = new Gameboard;
    board.placeShip(0, 2, 2, 'horizontal');
    
    expect(board.grid[0][2]).toEqual({hit: false, ship: expect.any(Ship)});
    expect(board.grid[1][2]).toEqual({hit: false, ship: expect.any(Ship)});
})

test('places new submarine on grid', () => {
    const board = new Gameboard;
    board.placeShip(0, 2, 3, 'horizontal');
    
    expect(board.grid[0][2]).toEqual({hit: false, ship: expect.any(Ship)});
    expect(board.grid[1][2]).toEqual({hit: false, ship: expect.any(Ship)});
    expect(board.grid[2][2]).toEqual({hit: false, ship: expect.any(Ship)});
})

test('returns false for ship originating outside grid bounds', () => {
    const board = new Gameboard;
    expect(board.placeShip(0, 11, 2, 'horizontal')).toBeFalsy();
});

test('returns false for ship whose length goes out of bounds', () => {
    const board = new Gameboard;
    expect(board.placeShip(0, 9, 2, 'horizontal')).toBeFalsy();
});

test('places a ship vertically', () => {
    const board = new Gameboard();
    board.placeShip(0, 2, 2, 'vertical');

    expect(board.grid[0][2]).toEqual({hit: false, ship: expect.any(Ship)});
    expect(board.grid[0][3]).toEqual({hit: false, ship: expect.any(Ship)});
})

test('returns false for vertical ship whose length goes out of bounds', () => {
    const board = new Gameboard;
    expect(board.placeShip(9, 0, 2, 'vertical')).toBeFalsy();
});