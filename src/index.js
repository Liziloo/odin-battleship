import { placeShips } from './modules/placeShips.js';
import { Player } from './modules/player.js';
import { round } from './modules/round.js';
import { loadWin } from './modules/loadWin.js';
import './styles/comeau-reset.css';
import './styles/styles.css';


// const name = prompt("What's your name, sailor?");
const player1 = new Player('real');
const player2 = new Player('real');
let playerCount;

const playerCountDiv = document.getElementById('player-count');
const placeButtonsDiv = document.getElementById('place-buttons');
const placeButtons = document.querySelectorAll('.place');
const boardsDiv = document.getElementById('boards');
const confirmButton = document.getElementById('confirm');
const placementBoard = document.getElementById('placement-board')
const obfuscationDiv = document.getElementById('obfuscation');
const takeConnDiv = document.getElementById('take-conn');
const passButton = document.getElementById('pass');
const receiveButton = document.getElementById('receive');
const enemyBoard = document.getElementById('enemy-board');

let admiral, enemy;

playerCountDiv.addEventListener('click', function getCount(e) {
    if (e.target.tagName === 'BUTTON') {
        playerCount = e.target.className;
        playerCountDiv.removeEventListener('click', getCount);
        playerCountDiv.style.display = 'none';
        placeButtonsDiv.style.display = 'block';
        player1.name = prompt("What's your name, sailor?");
        if (playerCount === '2') {
            player2.name = prompt("And you?");
            placeButtons[0].textContent = `Deploy ${player1.name}'s ships`;
            placeButtons[1].textContent = `Deploy ${player2.name}'s ships`;
        } else {
            placeButtons[1].style.display = 'none';
            placeButtons[1].disabled = true;
            placeButtons[0].textContent = 'Deploy your fleet!';
            player2.type = 'computer';
        }
        placeButtonsDiv.style.display = 'block';
    }
});

placeButtons.forEach((button) => {
    button.addEventListener('click', function callPlace(e) {
        e.target.removeEventListener('click', callPlace);
        e.target.disabled = true;
        boardsDiv.style.display = 'grid';
        if (e.target.classList.contains('1')) {
            placeShips(player1);
        } else {
            placeShips(player2)
        }
        if (placeButtons[0].disabled && placeButtons[1].disabled) {
            placeButtonsDiv.style.display = 'none';
        }
    })
})

confirmButton.addEventListener('click', function confirmPlacement() {
    this.style.display = 'none';
    if (placeButtons[0].disabled && placeButtons[1].disabled) {
        alert("To war!");
        placementBoard.style.display = 'none';
        this.removeEventListener('click', confirmPlacement);
        boardsDiv.style.display = 'flex';
        admiral = player1;
        enemy = player2;
        round(player1, player2);
    } else {
        boardsDiv.style.display = 'none';
    }
})

enemyBoard.addEventListener('click', (e) => {
    if (e.target.classList.contains('cell')) {
        const xCoord = e.target.dataset.x;
        const yCoord = e.target.dataset.y;
        enemy.board.receiveAttack(xCoord, yCoord);
        if (enemy.board.grid[xCoord][yCoord].ship !== null) {
            alert("It's a hit!");
            if (enemy.board.allSunk()) {
                loadWin();
            } else {
                obfuscationDiv.style.display = 'block';
            }
        } else {
            alert("Giving up is the only sure way to fail.");
            obfuscationDiv.style.display = 'block';
        }
    }
})

passButton.addEventListener('click', () => {
    boardsDiv.style.display = 'none';
    takeConnDiv.style.display = 'block';
    obfuscationDiv.style.display = 'none';
    admiral = admiral === player1 ? player2 : player1;
    enemy = enemy === player1 ? player2 : player1;
})

receiveButton.addEventListener('click', () => {
    takeConnDiv.style.display = 'none';
    round(admiral, enemy);
    boardsDiv.style.display = 'flex';
})