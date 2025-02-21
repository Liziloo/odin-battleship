import { randomCoord } from "./gameboard.js";
import { loadMyBoard } from "./loadMyBoard.js";

export { placeShips };

const placeShips = (player) => {
  const availableShips = [5, 4, 3, 3, 2];

  if (player.type === "real") {
    const shipImages = document.querySelectorAll(".ship-image");
    const ships = {
      carrier: 5,
      battleship: 4,
      cruiser: 3,
      submarine: 3,
      destroyer: 2,
    };
    let draggedShip, offsetX, offsetY;
    const placementBoard = document.getElementById("placement-board");
    const confirmButton = document.getElementById("confirm");
    const h2 = document.querySelector("h2");

    h2.textContent = "Please place your ships";

    loadMyBoard(player.board, "placement-board");

    shipImages.forEach((ship) => {
      ship.addEventListener("dragstart", (e) => {
        draggedShip = e.currentTarget;
        offsetX = e.clientX - ship.offsetLeft;
        offsetY = e.clientY - ship.offsetTop;
      });
    });

    placementBoard.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    placementBoard.addEventListener("drop", function addShip(e) {
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      const element = document.elementFromPoint(x, y);
      if (element.classList.contains("cell")) {
        const shipType = draggedShip.getAttribute("id");
        const draggedShipLength = ships[shipType];
        const xCoord = parseInt(element.dataset.x);
        const yCoord = parseInt(element.dataset.y);
        const validPlacement = player.board.placeShip(
          xCoord,
          yCoord,
          draggedShipLength,
          "horizontal",
        );
        if (!validPlacement) {
          alert(
            "Sorry admiral, no room to maneuver. Please provide new coordinates.",
          );
        } else {
          draggedShip.remove();
        }
        loadMyBoard(player.board, "placement-board");
        const stillShips = document.querySelector(".ship-image");
        if (!stillShips) {
          confirmButton.classList.remove("hide");
        }
      }
    });
  } else {
    for (let ship of availableShips) {
      let validPlacement = false;
      const directions = ["vertical", "horizontal"];
      while (!validPlacement) {
        const xCoord = randomCoord();
        const yCoord = randomCoord();
        const direction = directions[Math.floor(Math.random() * 2)];
        validPlacement = player.board.placeShip(
          xCoord,
          yCoord,
          ship,
          direction,
        );
      }
    }
  }
};
