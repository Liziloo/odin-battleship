import { Ship } from "./ship";

test('creates ship of correct length', () => {
    const ship = new Ship(3);

    expect(ship.length).toBe(3);
    expect(ship.hits).toBe(0);
    expect(ship.sunk).toBe(false);
})