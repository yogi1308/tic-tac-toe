(function () {
    game = {player: 1, board: [], players: [], 
        async initialize() {
            await this.givePlayerName();
            this.displayScore()
            this.gameboard();
        },
        gameboard() {
            const container = document.querySelector('.container');
            this.board = [];
            for (let i = 0; i < 3; i++) {
                row = [];
                for (let j = 0; j < 3; j++) {
                    row.push('');
                    const cell = document.createElement('div');
                    cell.classList.add('cell'); cell.classList.add(i + '-' + j);
                    cell.addEventListener('click', (event) => this.cellClicked(event), { once: true });
                    container.appendChild(cell);
                }
                this.board.push(row);
            }
        },
        givePlayerName() {
            return new Promise((resolve) => {
                const playerNameForm = document.querySelector('dialog.playerNameForm');
                playerNameForm.showModal();
                const startGameButton = playerNameForm.querySelector('button.startGame');
                
                startGameButton.addEventListener('click', () => {
                    const player1Name = playerNameForm.querySelector('input[name="player1Name"]').value;
                    const player2Name = playerNameForm.querySelector('input[name="player2Name"]').value;
                    player1Mark = 'X';
                    player2Mark = 'O';
                    
                    player1 = createPlayer(player1Name, player1Mark);
                    player2 = createPlayer(player2Name, player2Mark);
                    
                    playerNameForm.close();
                    
                    const themeButtons = document.querySelectorAll('button.theme');
                    themeButtons.forEach(button => {button.style.display = 'block'});
                    
                    resolve();
                });

                function createPlayer(name, mark) {
                    return {name, mark};
                }
            });
        },
        cellClicked(event) {
            if (this.player % 2 === 1) {mark = 'X'} else {mark = 'O'}
            if (this.player % 2 === 1) {playerName = player1.name} else {playerName = player2.name}
            let cell = event.target;
            console.log(cell);
            let cellIndex = cell.classList[1].split('-')[1];
            let rowIndex = cell.classList[1].split('-')[0];
            console.log(rowIndex, cellIndex);
            this.board[rowIndex][cellIndex] = mark;
            cell.textContent = mark;
            this.player++;
            if (this.checkWinner(mark)) {
                console.log(playerName + ' wins!');
                endScreen = document.querySelector('dialog.end-screen');
                endScreen.showModal();
                endScreen.querySelector('dialog.end-screen > div:nth-child(1)').textContent = playerName + ' wins!';
                this.incrementScore(playerName)
                resetGame = document.querySelector('button.resetGame').addEventListener('click', () => this.resetGame());
                playAgain = document.querySelector('button.playAgain').addEventListener('click', () => this.playAgain());

            }
            console.log(this.board);
        },
        checkWinner(playerMark) {
            mark = playerMark;
            if (this.board[0][0] === mark && this.board[0][1] === mark && this.board[0][2] === mark) {
                return true;
            }
            else if (this.board[1][0] === mark && this.board[1][1] === mark && this.board[1][2] === mark) {
                return true;
            }
            else if (this.board[2][0] === mark && this.board[2][1] === mark && this.board[2][2] === mark) {
                return true;
            }
            else if (this.board[0][0] === mark && this.board[1][0] === mark && this.board[2][0] === mark) {
                return true;
            }
            else if (this.board[0][1] === mark && this.board[1][1] === mark && this.board[2][1] === mark) {
                return true;
            }
            else if (this.board[0][2] === mark && this.board[1][2] === mark && this.board[2][2] === mark) {
                return true;
            }
            else if (this.board[0][0] === mark && this.board[1][1] === mark && this.board[2][2] === mark) {
                return true;
            }
            else if (this.board[0][2] === mark && this.board[1][1] === mark && this.board[2][0] === mark) {
                return true;
            }
            else if (this.board[0][0] !== '' && this.board[0][1] !== '' && this.board[0][2] !== '' && this.board[1][0] !== '' && this.board[1][1] !== '' && this.board[1][2] !== '' && this.board[2][0] !== '' && this.board[2][1] !== '' && this.board[2][2] !== '') {
                console.log('It is a tie');
                return true;
            }
            else {
                return false;
            }
        },
        resetGame() {
            window.location.reload();
        },
        playAgain() {
            let container = document.querySelector('.container');
            let cells = document.querySelectorAll('.cell');
            cells.forEach(cell => {
                container.removeChild(cell);
            });
            endScreen = document.querySelector('dialog.end-screen');
            endScreen.close()
            this.gameboard();
            this.player = 1;
        }, 
        displayScore() {
            const score = document.querySelector('.score');
            const player1score = document.createElement('div');
            player1score.classList.add('player1score');
            player1score.textContent = player1.name + ": 0";
            const player2score = document.createElement('div');
            player2score.classList.add('player2score');
            player2score.textContent = player2.name + ': 0';
            score.appendChild(player1score);
            score.appendChild(player2score);
        },
        incrementScore(winner) {
            if (winner == player1.name) {
                const scoreElement = document.querySelector('body > div.score > div.player1score');
                const currScore = parseInt(scoreElement.textContent.split(': ')[1]) + 1;
                scoreElement.textContent = player1.name + ": " + currScore;
            }
            else if (winner == player2.name) {
                const scoreElement = document.querySelector('body > div.score > div.player2score');
                const currScore = parseInt(scoreElement.textContent.split(': ')[1]) + 1;
                scoreElement.textContent = player2.name + ": " + currScore;
            }
        }
    }
    game.initialize();

})()