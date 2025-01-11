(function () {
    function createPlayer(name, mark) {
        return {name, mark};
    }

    game = {player: 1, board: [], players: [], 
        async initialize() {
            const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
            if (isDarkMode) {
                this.darkTheme();
            }
            await this.givePlayerName();
            this.displayScore();
            this.gameboard();
            const turn = document.querySelector('div.turn');
            turn.textContent = this.players[0].name + "'s Turn";
            document.querySelector('button.resetGame').addEventListener('click', () => this.resetGame());
            document.querySelector('button.playAgain').addEventListener('click', () => this.playAgain());
            document.querySelector('button.switchSigns').addEventListener('click', () => this.switchSigns());
            document.querySelectorAll('button.theme').forEach(button => {button.addEventListener('click', () => this.switchTheme(button))});
            
            // Close button handler
            document.querySelector('button.closeButton').addEventListener('click', () => {
                document.querySelector('dialog.end-screen').close();
                const cells = document.querySelectorAll('.cell');
                cells.forEach(cell => {
                    cell.style.pointerEvents = 'none';  // Disable clicking
                    cell.classList.remove('X-hover', 'O-hover');  // Remove hover effects
                });
            });
        },
        gameboard() {
            const container = document.querySelector('.container');
            this.board = [];
            for (let i = 0; i < 3; i++) {
                row = [];
                for (let j = 0; j < 3; j++) {
                    row.push('');
                    const cell = document.createElement('div');
                    cell.classList.add('cell'); 
                    cell.classList.add(i + '-' + j);
                    cell.classList.add('X-hover');
                    
                    // Apply current theme to new cells
                    const body = document.querySelector('body');
                    if (body.classList.contains('dark')) {
                        cell.classList.add('dark');
                    } else if (body.classList.contains('neon')) {
                        cell.classList.add('neon');
                    }
                    
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

                    this.players.push(player1);
                    this.players.push(player2);
                    
                    playerNameForm.close();
                    
                    const themeButtons = document.querySelectorAll('button.theme');
                    themeButtons.forEach(button => {button.style.display = 'block'});
                    
                    resolve();
                });
            });
        },
        cellClicked(event) {
            const turn = document.querySelector('div.turn');
            if (this.player % 2 === 1) {
                mark = this.players[0].mark;
                playerName = this.players[0].name;
            } else {
                mark = this.players[1].mark;
                playerName = this.players[1].name;
            }
            
            let cell = event.target;
            let cellIndex = cell.classList[1].split('-')[1];
            let rowIndex = cell.classList[1].split('-')[0];
            this.board[rowIndex][cellIndex] = mark;
            cell.textContent = mark;
            this.player++;

            const emptyCells = document.querySelectorAll('.cell:empty');
            emptyCells.forEach(cell => {
                cell.classList.remove('X-hover', 'O-hover');
                const nextMark = this.player % 2 === 1 ? 'X' : 'O';
                cell.classList.add(`${nextMark}-hover`);
            });

            if (mark === 'X') {
                cell.style.color = 'lightcoral';
            } else {
                cell.style.color = 'rgb(107, 199, 230)';
            }

            if (!this.checkWinner(mark)) {
                turn.textContent = (this.player % 2 === 1 ? this.players[0].name : this.players[1].name) + "'s Turn";
            } 
            else if (this.checkWinner(mark) === 'tie') {
                turn.textContent = "It's a Tie!";
                endScreen = document.querySelector('dialog.end-screen');
                endScreen.showModal();
                endScreen.querySelector('dialog.end-screen > div:nth-child(1)').textContent = "It's a Tie!";
                endScreen.querySelector('button.closeButton').addEventListener('click', () => endScreen.close());
            }
            else {
                turn.textContent = playerName + " wins!";
                endScreen = document.querySelector('dialog.end-screen');
                endScreen.showModal();
                endScreen.querySelector('dialog.end-screen > div:nth-child(2)').textContent = playerName + ' Wins!';
                this.incrementScore(playerName);
            }
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
                return 'tie';
            }
            else {
                return false;
            }
        },
        resetGame() {
            // Clear the board
            let container = document.querySelector('.container');
            let cells = document.querySelectorAll('.cell');
            cells.forEach(cell => {
                container.removeChild(cell);
            });

            // Clear the scores
            const score = document.querySelector('.score');
            while (score.firstChild) {
                score.removeChild(score.firstChild);
            }

            // Reset game state
            this.player = 1;
            this.board = [];
            this.players = [];

            // Close end screen if open
            const endScreen = document.querySelector('dialog.end-screen');
            if (endScreen.open) {
                endScreen.close();
            }

            // Clear turn display
            const turn = document.querySelector('div.turn');
            turn.textContent = '';

            // Reinitialize the game
            this.givePlayerName();
            this.displayScore();
            this.gameboard();
            playerTurn = document.querySelector('div.turn');
            playerTurn.textContent = player1.name + "'s turn";
        },
        playAgain() {
            let container = document.querySelector('.container');
            let cells = document.querySelectorAll('.cell');
            cells.forEach(cell => {
                container.removeChild(cell);
            });
            endScreen = document.querySelector('dialog.end-screen');
            endScreen.close();
            this.gameboard();
            this.player = 1;
            const turn = document.querySelector('div.turn');
            turn.textContent = this.players[0].name + "'s turn";
        }, 
        switchSigns() {
            if (player1.mark === 'X') {
                player1Mark = 'O' 
                player2Mark = 'X'
                player1 = createPlayer(player1.name, player1Mark);
                player2 = createPlayer(player2.name, player2Mark);
                this.players[1] = player1;
                this.players[0] = player2;
            } 
            else {
                player1Mark = 'X' 
                player2Mark = 'O'
                player1 = createPlayer(player1.name, player1Mark);
                player2 = createPlayer(player2.name, player2Mark);
                this.players[0] = player1;
                this.players[1] = player2;
            }
            endScreen = document.querySelector('dialog.end-screen');
            endScreen.close()
            let container = document.querySelector('.container');
            let cells = document.querySelectorAll('.cell');
            cells.forEach(cell => {
                container.removeChild(cell);
            });
            this.player = 1;
            this.gameboard();
            const turn = document.querySelector('div.turn');
            turn.textContent = this.players[0].name + "'s turn";
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
        },
        switchTheme(button) {
            if (button.textContent === 'Light') {this.lightTheme()}
            else if (button.textContent === 'Dark') {this.darkTheme()}
            else if (button.textContent === 'Neon') {this.neonTheme()}
        },
        lightTheme() {
            body = document.querySelector('body')
            body.classList.remove('neon')
            body.classList.remove('dark')
            cells = document.querySelectorAll('.cell')
            cells.forEach(cell => {cell.classList.remove('neon'); cell.classList.remove('dark')})
            buttons = document.querySelectorAll('button.theme')
            buttons.forEach(button => {button.classList.remove('neon'); button.classList.remove('dark')})
            dialog = document.querySelectorAll('dialog')
            dialog.forEach(dialog => {dialog.classList.remove('dark'); dialog.classList.remove('neon')})
        },
        darkTheme() {
            body = document.querySelector('body')
            body.classList.remove('neon')
            body.classList.remove('dark')
            body.classList.add('dark')
            cells = document.querySelectorAll('.cell')
            cells.forEach(cell => {cell.classList.remove('neon'); cell.classList.remove('dark')})
            buttons = document.querySelectorAll('button.theme')
            buttons.forEach(button => {button.classList.remove('neon'); button.classList.remove('dark'); button.classList.add('dark')})
            dialog = document.querySelectorAll('dialog')
            dialog.forEach(dialog => {dialog.classList.remove('neon'); dialog.classList.remove('dark'); dialog.classList.add('dark')})
        },
        neonTheme() {
            body = document.querySelector('body')
            body.classList.remove('neon')
            body.classList.remove('dark')
            body.classList.add('neon')
            cells = document.querySelectorAll('.cell')
            cells.forEach(cell => {cell.classList.remove('dark'); cell.classList.remove('neon'); cell.classList.add('neon')})
            buttons = document.querySelectorAll('button.theme')
            buttons.forEach(button => {button.classList.remove('dark'); button.classList.remove('neon'); button.classList.add('neon')})
            dialog = document.querySelectorAll('dialog')
            dialog.forEach(dialog => {dialog.classList.remove('dark'); dialog.classList.remove('neon'); dialog.classList.add('neon')})
        },
        closeEndScreen() {
            const endScreen = document.querySelector('dialog.end-screen');
            endScreen.close();
        }

    }
    game.initialize();

})()