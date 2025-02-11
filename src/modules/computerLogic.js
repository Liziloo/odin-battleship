export { computerAttack };

const computerAttack = (board) => {
    let validHit, xCoord, yCoord;
    do {
        xCoord = randomCoord();
        yCoord = randomCoord();
        validHit = board.receiveAttack(xCoord, yCoord);
    } while (!validHit);
    if (board.grid[xCoord][yCoord].ship !== null) {
        return 'hit';
    } 
    return 'miss';
}

const randomCoord = () => {
    return Math.floor(Math.random() * 10);
}