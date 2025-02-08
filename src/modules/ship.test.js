import { expect, test } from '@jest/globals';
import { Ship } from "./ship";

test('creates ship of length 3', () => {
    const ship = new Ship(3);

    expect(ship.length).toBe(3);
    expect(ship.hits).toBe(0);
    expect(ship.sunk).toBe(false);
});

test('creates ship of length 5', () => {
    const ship = new Ship(5);

    expect(ship.length).toBe(5);
    expect(ship.hits).toBe(0);
    expect(ship.sunk).toBe(false);
})