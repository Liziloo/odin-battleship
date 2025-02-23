import { displayShips } from "./displayShips.js";
import { randomCoord } from "./gameboard.js";
import { loadMyBoard } from "./loadMyBoard.js";
import { shipTypes } from "./ship.js";

export { placeShips };

const placeShips = (player) => {
  if (player.type === "real") {
    const shipImages = document.querySelectorAll(".ship-image");
    shipImages.forEach((shipImage) => {
      shipImage.classList.remove("hide");
    });
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
        const xCoord = parseInt(element.dataset.x);
        const yCoord = parseInt(element.dataset.y);
        const validPlacement = player.board.placeShip(
          xCoord,
          yCoord,
          shipType,
          "horizontal",
        );
        if (!validPlacement) {
          alert(
            "Sorry admiral, no room to maneuver. Please provide new coordinates.",
          );
        } else {
          draggedShip.classList.add("hide");
        }
        loadMyBoard(player.board, "placement-board");
        displayShips();
        let hiddenShipCount = 0;
        shipImages.forEach((shipImage) => {
          if (shipImage.classList.contains("hide")) {
            hiddenShipCount++;
          }
        });
        if (hiddenShipCount === 5) {
          confirmButton.classList.remove("hide");
          placementBoard.removeEventListener("drop", addShip);
        }
      }
    });
  } else {
    const availableShips = Object.keys(shipTypes);
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
