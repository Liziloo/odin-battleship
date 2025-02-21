import shipTop from "../assets/ship-top.png";

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

  const carrierDivs = document.querySelectorAll(".carrier");
  const battleshipDivs = document.querySelectorAll(".battleship");
  const cruiserDivs = document.querySelectorAll(".cruiser");
  const submarineDivs = document.querySelectorAll(".submarine");
  const destroyerDivs = document.querySelectorAll(".destroyer");

  const carrierImage = document.createElement("img");
  carrierImage.src = shipTop;
  carrierImage.style.position = "absolute";
  carrierImage.style.zIndex = "1";

  let minTop = Infinity,
    maxBottom = -Infinity,
    minLeft = Infinity,
    maxRight = -Infinity;

  carrierDivs.forEach((div) => {
    const rect = div.getBoundingClientRect();
    minTop = Math.min(minTop, rect.top);
    maxBottom = Math.max(maxBottom, rect.bottom);
    minLeft = Math.min(minLeft, rect.left);
    maxRight = Math.max(maxRight, rect.right);
    console.log(minTop, maxBottom, minLeft, maxRight);
  });

  if (carrierDivs.length > 0) {
    carrierImage.style.top = minTop + "px";
    carrierImage.style.left = minLeft + "px";
    carrierImage.style.width = maxRight - minLeft + "px";
    carrierImage.style.height = maxBottom - minTop + "px";
    carrierImage.classList.add("overlay-image");

    document.body.appendChild(carrierImage);
  }
};
