export { loadMyBoard };

const loadMyBoard = (board, divId) => {
  const overlayImages = document.querySelectorAll(".overlay-image");
  overlayImages.forEach((element) => {
    element.remove();
  });
  const boardDiv = document.getElementById(divId);
  boardDiv.textContent = "";

  for (let i = 0; i < board.grid.length; i++) {
    for (let j = 0; j < board.grid[i].length; j++) {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      cellDiv.dataset.x = i;
      cellDiv.dataset.y = j;
      if (board.grid[i][j].hit === true) {
        cellDiv.classList.add("hit");
      }
      if (board.grid[i][j].ship) {
        cellDiv.classList.add("ship");
        cellDiv.classList.add(board.grid[i][j].ship.type);
        if (board.grid[i][j].ship.sunk === true) {
          cellDiv.classList.add("sunk");
        }
      }
      boardDiv.appendChild(cellDiv);
    }
  }

  
};
