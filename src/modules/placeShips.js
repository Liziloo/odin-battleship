import { displayShips } from "./displayShips.js";
import { randomCoord } from "./gameboard.js";
import { loadMyBoard } from "./loadMyBoard.js";
import { shipTypes } from "./ship.js";

export { placeShips };

const placeShips = (player) => {
  if (player.type === "real") {
    const orientationDiv = document.querySelector("#rotate-buttons");
    const orientationButtons = document.querySelectorAll(".orientation");
    const shipImages = document.querySelectorAll(".ship-image");
    const placementBoard = document.getElementById("placement-board");
    const confirmButton = document.getElementById("confirm");
    const shipsDiv = document.querySelector("#ships");
    const h2 = document.querySelector("h2");

    let draggedShip, offsetX, offsetY;

    let shipOrientation = "horizontal";

    orientationDiv.classList.remove("hide");
    orientationButtons.forEach((button) => {
      const buttonDirection = button.getAttribute("id");
      button.addEventListener("click", () => {
        shipOrientation = buttonDirection;
        shipsDiv.classList.add(buttonDirection);
        if (buttonDirection === "horizontal") {
          shipsDiv.classList.remove("vertical");
        } else {
          shipsDiv.classList.remove("horizontal");
        }
      });
    });

    shipImages.forEach((shipImage) => {
      shipImage.classList.remove("hide");
    });

    h2.textContent = "Please place your ships";

    loadMyBoard(player.board, "placement-board");

    shipImages.forEach((ship) => {
      ship.addEventListener("dragstart", (e) => {
        draggedShip = e.currentTarget;
        const rect = draggedShip.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
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
          shipOrientation,
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
