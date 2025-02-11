import { loadGameboard } from "./loadGameboard.js";
export { round };

const round = (player) => {
    const h2 = document.querySelector('h2');
    h2.textContent = `${player.name}'s Turn`;
    const boardDiv = document.querySelector('.board');
    boardDiv.textContent = '';
    loadGameboard(player.board);
}