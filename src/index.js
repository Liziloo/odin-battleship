import { placeShips } from './modules/placeShips.js';
import { Player } from './modules/player.js';
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
        }
        if (placeButtons[0].disabled && placeButtons[1].disabled) {
            placeButtonsDiv.style.display = 'none';
        }
    })
})