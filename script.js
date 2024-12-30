gameboard()
givePlayerName()
function gameboard() {
    board = [];
    for (let i = 0; i < 3; i++) {
        row = [];
        for (let j = 0; j < 3; j++) {
            row.push('');
        }
        board.push(row);
    }
    console.log(board);
}

function givePlayerName() {
    let player1Name = prompt('Enter player 1 name');
    player1Mark = 'X'
    let player2Name = prompt('Enter player 2 name');
    player2Mark = 'O'
    player1 = createPlayer(player1Name, player1Mark);
    player2 = createPlayer(player2Name, player2Mark);
    console.log(player1, player2);
}

function createPlayer(name, mark) {
    return {name, mark};
}