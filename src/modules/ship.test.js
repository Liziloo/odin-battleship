import { expect, test } from '@jest/globals';
import { Ship } from "./ship";

test('creates submarine', () => {
    const ship = new Ship('submarine');

    expect(ship.length).toBe(3);
    expect(ship.hits).toBe(0);
    expect(ship.sunk).toBe(false);
    expect(ship.type).toBe('submarine');
});

test('creates carrier', () => {
    const ship = new Ship('carrier');

    expect(ship.length).toBe(5);
    expect(ship.hits).toBe(0);
    expect(ship.sunk).toBe(false);
    expect(ship.type).toBe('carrier');
})