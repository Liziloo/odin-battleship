export { loadGameboard }

const loadGameboard = (playerBoard) => {
    const boardDiv = document.querySelector('.board');

    for (let row of playerBoard.grid) {
        for (let cell of row) {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            if (cell.ship) {
                cellDiv.classList.add('ship');
            }
            boardDiv.appendChild(cellDiv);
        }
    }
}