import { placeShips } from "./modules/placeShips.js";
import { Player } from "./modules/player.js";
import { round } from "./modules/round.js";
import { loadWin } from "./modules/loadWin.js";
import "./styles/comeau-reset.css";
import "./styles/styles.css";
import { loadEnemyBoard } from "./modules/loadEnemyBoard.js";
import { displayShips } from "./modules/displayShips.js";

(function () {
  const player1 = new Player("real");
  const player2 = new Player("real");
  let playerCount;

  const playerCountDiv = document.getElementById("player-count");
  const placeButtonsDiv = document.getElementById("place-buttons");
  const placeButtons = document.querySelectorAll(".place");
  const boardsDiv = document.getElementById("boards");
  const confirmButton = document.getElementById("confirm");
  const placementBoard = document.getElementById("placement-board");
  const obfuscationDiv = document.getElementById("obfuscation");
  const takeConnDiv = document.getElementById("take-conn");
  const passButton = document.getElementById("pass");
  const receiveButton = document.getElementById("receive");
  const enemyBoard = document.getElementById("enemy-board");
  const myBoard = document.getElementById("my-board");
  const nameModal = document.querySelector(".modal-background");
  const namesForm = document.getElementById("names");
  const nameDiv2 = document.getElementById("name-2");
  const nameSubmitButton = document.getElementById("name-submit");
  const modalClose = document.querySelector(".close-button");
  const playgroundDiv = document.querySelector("#playground");
  const placementDiv = document.querySelector("#placement-div");

  let admiral, enemy;

  playerCountDiv.addEventListener("click", function getCount(e) {
    if (e.target.tagName === "BUTTON") {
      playerCount = e.target.className;
      if (playerCount === "1") {
        nameDiv2.classList.add("hide");
      }
      nameModal.classList.remove("hide");
    }
  });

  nameSubmitButton.addEventListener("click", (e) => {
    e.preventDefault();
    playerCountDiv.classList.add("hide");
    placeButtonsDiv.classList.remove("hide");
    const formData = new FormData(namesForm);
    player1.name = formData.get("name-input-1");
    if (playerCount === "2") {
      player2.name = formData.get("name-input-2");
      placeButtons[0].textContent = `Deploy ${player1.name}'s ships`;
      placeButtons[1].textContent = `Deploy ${player2.name}'s ships`;
    } else {
      placeButtons[1].classList.add("hide");
      placeButtons[1].disabled = true;
      placeButtons[0].textContent = "Deploy your fleet!";
      player2.type = "computer";
      placementBoard.classList.remove("hide");
    }
    placeButtonsDiv.classList.remove("hide");
    nameModal.classList.add("hide");
  });

  modalClose.addEventListener("click", (e) => {
    e.preventDefault();
    nameModal.classList.add("hide");
  });

  placeButtons.forEach((button) => {
    button.addEventListener("click", function callPlace(e) {
      e.target.removeEventListener("click", callPlace);
      e.target.disabled = true;
      placementDiv.classList.remove("hide");
      if (e.target.classList.contains("1")) {
        placeShips(player1);
      } else {
        placeShips(player2);
      }
      if (placeButtons[0].disabled && placeButtons[1].disabled) {
        placeButtonsDiv.classList.add("hide");
        if (player2.type === "computer") {
          placeShips(player2);
        }
      }
    });
  });

  confirmButton.addEventListener("click", function confirmPlacement() {
    const shipImages = document.querySelectorAll(".ship-illustration");
    shipImages.forEach((element) => {
      element.remove();
    });
    this.classList.add("hide");
    if (placeButtons[0].disabled && placeButtons[1].disabled) {
      placementDiv.remove();
      alert("To war!");
      this.removeEventListener("click", confirmPlacement);
      admiral = player1;
      enemy = player2;
      playgroundDiv.classList.remove("hide");
      myBoard.classList.remove("hide");
      enemyBoard.classList.remove("hide");
      round(player1, player2);
    } else {
      placementDiv.classList.add("hide");
    }
  });

  enemyBoard.addEventListener("click", (e) => {
    if (e.target.classList.contains("cell")) {
      const xCoord = e.target.dataset.x;
      const yCoord = e.target.dataset.y;
      enemy.board.receiveAttack(xCoord, yCoord);
      if (enemy.board.grid[xCoord][yCoord].ship !== null) {
        loadEnemyBoard(enemy.board, "enemy-board");
        alert("It's a hit!");
        if (enemy.board.allSunk()) {
          loadWin();
          return;
        }
      } else {
        loadEnemyBoard(enemy.board, "enemy-board");
        alert("Giving up is the only sure way to fail.");
      }
      if (enemy.type === "real") {
        obfuscationDiv.classList.remove("hide");
      } else {
        admiral.board.computerAttack();
        round(admiral, enemy);
        if (player1.board.allSunk()) {
          loadWin(player2);
        }
      }
    }
  });

  passButton.addEventListener("click", () => {
    const shipImages = document.querySelectorAll(".ship-illustration");
    shipImages.forEach((element) => {
      element.remove();
    });
    boardsDiv.classList.add("hide");
    takeConnDiv.classList.remove("hide");
    obfuscationDiv.classList.add("hide");
    admiral = admiral === player1 ? player2 : player1;
    enemy = enemy === player1 ? player2 : player1;
  });

  receiveButton.addEventListener("click", () => {
    takeConnDiv.classList.add("hide");
    round(admiral, enemy);
    boardsDiv.classList.remove("hide");
    displayShips()
  });
})();
