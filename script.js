gameflow()
function gameflow() {
    gameboard();
    givePlayerName();
    switchTurn();
}
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

function switchTurn() {
    while (!checkWinner(player1) || !checkWinner(player2)) {
        playerTurn(player1)
        console.log(board)
        playerTurn(player2)
        console.log(board)
    }
}

function checkWinner(player) {
    mark = player.mark;
    if (board[0][0] === mark && board[0][1] === mark && board[0][2] === mark) {
        console.log(player.name + 'You win');
        return true;
    }
    else if (board[1][0] === mark && board[1][1] === mark && board[1][2] === mark) {
        console.log(player.name + 'You win');
        return true;
    }
    else if (board[2][0] === mark && board[2][1] === mark && board[2][2] === mark) {
        console.log(player.name + 'You win');
        return true;
    }
    else if (board[0][0] === mark && board[1][0] === mark && board[2][0] === mark) {
        console.log(player.name + 'You win');
        return true;
    }
    else if (board[0][1] === mark && board[1][1] === mark && board[2][1] === mark) {
        console.log(player.name + 'You win');
        return true;
    }
    else if (board[0][2] === mark && board[1][2] === mark && board[2][2] === mark) {
        console.log(player.name + 'You win');
        return true;
    }
    else if (board[0][0] === mark && board[1][1] === mark && board[2][2] === mark) {
        console.log(player.name + 'You win');
        return true;
    }
    else if (board[0][2] === mark && board[1][1] === mark && board[2][0] === mark) {
        console.log(player.name + 'You win');
        return true;
    }
    else {
        return false;
    }
}

function playTurn(player) {
    let empty = true;
    while(empty) {
        prompt('Enter your move' + player.name + '(rows)');
        prompt('Enter your move(columns)');
        if (board[row][column] === '') {
            board[row][column] = player.mark;
            empty = false;
        }
        
    }
}