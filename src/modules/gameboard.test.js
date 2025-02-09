import { Gameboard } from "./gameboard";
import { Ship } from "./ship";
import { beforeEach, describe, expect, test } from '@jest/globals';


describe('Gameboard', () => {
    let board;

    beforeEach(() => {
        board = new Gameboard();
    })

    test('places new destroyer on grid', () => {
        board.placeShip(0, 2, 2, 'horizontal');
        
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (i === 2 && (j === 0 || j === 1)) {
                    expect(board.grid[i][j]).toEqual({hit: false, ship: expect.any(Ship)});
                } else {
                    expect(board.grid[i][j]).toEqual({hit: false, ship: null});
                }
            }
        }
    })

    test('places new submarine on grid', () => {
        board.placeShip(0, 2, 3, 'horizontal');
        
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (i === 2 && (j === 0 || j === 1 || j === 2)) {
                    expect(board.grid[i][j]).toEqual({hit: false, ship: expect.any(Ship)});
                } else {
                    expect (board.grid[i][j]).toEqual({hit: false, ship: null});
                }
            }
        }
    })

    test('returns false for ship originating outside grid bounds', () => {
        expect(board.placeShip(0, 11, 2, 'horizontal')).toBeFalsy();
    });

    test('returns false for ship whose length goes out of bounds', () => {
        expect(board.placeShip(0, 9, 2, 'horizontal')).toBeFalsy();
    });

    test('places a ship vertically', () => {
        board.placeShip(0, 8, 2, 'vertical');

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (j === 0 && (i === 8 || i === 9)) {
                    expect(board.grid[i][j]).toEqual({hit: false, ship: expect.any(Ship)});
                } else {
                    expect(board.grid[i][j]).toEqual({hit: false, ship: null});
                }
            }
        }
    })

    test('returns false for vertical ship whose length goes out of bounds', () => {
        expect(board.placeShip(9, 0, 2, 'vertical')).toBeFalsy();
    });

    test('returns false for placing ship on top of other ship', () => {
        board.placeShip(0, 0, 3, 'horizontal');

        expect(board.placeShip(1, 0, 2, 'horizontal')).toBeFalsy();
        expect(board.placeShip(1, 0, 2, 'vertical')).toBeFalsy();
    })

    test('records hit on ship', () => {
        board.placeShip(0, 1, 2, 'horizontal');
        board.receiveAttack(0,1);
        expect(board.grid[1][0]).toEqual({hit: true, ship: expect.any(Ship)});
        expect(board.grid[1][0].ship.hits).toBeGreaterThan(0);
    })

    test('records strike on water', () => {
        board.placeShip(0, 1, 2, 'horizontal');
        board.receiveAttack(9, 9);
        expect(board.grid[9][9]).toEqual({hit: true, ship: null});
    });

    test('returns false for coordinates outside grid', () => {
        expect(board.receiveAttack(10, 1)).toBe(false);
    });

    test('Second attack on coordinates returns false', () => {
        board.receiveAttack(0,0);
        expect(board.receiveAttack(0, 0)).toBe(false);
    });

    test('Sinks ship if all coordinates hit', () => {
        board.placeShip(0, 0, 2, 'horizontal');
        board.receiveAttack(0,0);

        expect(board.grid[0][0].ship.sunk).toBe(false);
        expect(board.grid[0][1].ship.sunk).toBe(false);

        board.receiveAttack(1,0);

        expect(board.grid[0][0].ship.sunk).toBe(true);
        expect(board.grid[0][1].ship.sunk).toBe(true);
    })
})