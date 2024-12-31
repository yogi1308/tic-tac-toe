gameflow()
function gameflow() {
    player = 1
    gameboard();
    givePlayerName();
}

function cellClicked(event) {
    if (player % 2 === 1) {mark = 'X'} else {mark = 'O'}
    let cell = event.target;
    console.log(cell);
    let cellIndex = cell.classList[1].split('-')[1];
    let rowIndex = cell.classList[1].split('-')[0];
    console.log(rowIndex, cellIndex);
    board[rowIndex][cellIndex] = mark;
    cell.textContent = mark;
    player++;
    checkWinner(mark)
    console.log(board);
}

function gameboard() {
    const container = document.querySelector('.container');
    board = [];
    for (let i = 0; i < 3; i++) {
        row = [];
        for (let j = 0; j < 3; j++) {
            row.push('');
            const cell = document.createElement('div');
            cell.classList.add('cell'); cell.classList.add(i + '-' + j);
            cell.addEventListener('click', cellClicked, {once: true});
            container.appendChild(cell);
        }
        board.push(row);
    }
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

function checkWinner(playerMark) {
    mark = playerMark;
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
    else if (board[0][0] !== '' && board[0][1] !== '' && board[0][2] !== '' && board[1][0] !== '' && board[1][1] !== '' && board[1][2] !== '' && board[2][0] !== '' && board[2][1] !== '' && board[2][2] !== '') {
        console.log('It is a tie');
        return true;
    }
    else {
        return false;
    }
}

// function switchTurn(event) {
//     while (!checkWinner(player2)) {
//         playerTurn(player1, event)
//         for (let i = 0; i < 3; i++) {
//         console.log(board[i]);
//         }
//         if (checkWinner(player1, event)) {
//             break;
//         }
//         playerTurn(player2)
//         for (let i = 0; i < 3; i++) {
//             console.log(board[i]);
//         }
//     }
// }

// function playerTurn(player) {
//     let empty = true;
//     while(empty) {
//         row = 
//         column = 
//         if (board[row][column] === '') {
//             board[row][column] = player.mark;
//             empty = false;
//         }
//         else {
//             console.log("Invalid move. Try again.");
//         }
        
//     }
// }


