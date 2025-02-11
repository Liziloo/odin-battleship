export { computerAttack };

const computerAttack = (board) => {
    const xCoord = randomCoord();
    const yCoord = randomCoord();
    let validHit;
    do {
        validHit = board.receiveAttack(xCoord, yCoord);
    } while (!validHit);
    return;
}

const randomCoord = () => {
    return Math.floor(Math.random() * 10);
}