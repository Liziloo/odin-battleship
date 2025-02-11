import { loadEnemyBoard } from "./loadEnemyBoard.js";
import { loadMyBoard } from "./loadMyBoard.js";
export { round };

const round = (player, opponent) => {
    const h2 = document.querySelector('h2');
    h2.textContent = `${player.name}'s Turn`;
    loadMyBoard(player.board);
    loadEnemyBoard(opponent.board);
}