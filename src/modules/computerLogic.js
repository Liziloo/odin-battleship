export { computerAttack };

const computerAttack = (board) => {
    let validHit;
    do {
        validHit = board.receiveAttack(randomCoord(), randomCoord());
    } while (!validHit);
    return;
}

const randomCoord = () => {
    return Math.floor(Math.random() * 10);
}