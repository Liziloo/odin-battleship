export { loadWin };

const loadWin = (player) => {
    const boardsDiv = document.querySelector('.boards');
    boardsDiv.textContent = `${player.name} wins!`;
}