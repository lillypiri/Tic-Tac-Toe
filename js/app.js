// code is wrapped in a single self-invoking function
(function() {
    document.addEventListener("DOMContentLoaded", () => {
        var boardDiv = document.getElementById("board");
        boardDiv.style.display = "none";

        var xSymbol = document.getElementById("player2");
        var oSymbol = document.getElementById("player1");

        var startDiv = document.getElementById("start");
        var startButton = document.querySelector(".screen-start .button");

        var boxes = [].slice.call(document.getElementsByClassName("box"), 0);

        var endGameDiv = document.getElementById("finish");
        endGameDiv.style.display = "none";

        var screenWin = document.querySelector(".screen-win");
        var screenWinButton = document.querySelector(".screen-win .button");
        var screenMessage = document.querySelector(".message");

        var userName = document.getElementById('username');

        var state;

        var winningLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        // reset the state
        function reset() {
            state = {
                currentPlayer: "x",
                board: Array(9),
                winner: null
            };

            render();
        }

        // check to see if we have a winner
        function checkWinner(board) {
            for (var i = 0; i < winningLines.length; i++) {
                var a = winningLines[i][0];
                var b = winningLines[i][1];
                var c = winningLines[i][2];

                if (
                    board[a] &&
                    board[a] === board[b] &&
                    board[a] === board[c]
                ) {
                    return board[a];
                }
            }
            if (boardFull(board)) {
                return "";
            }

            return null;
        }

        // check if the board is full, returns boolean
        function boardFull(board) {
            return (board.filter(function(item) {
                    return item !== null;
                }).length === 9
            );
        }

        function render() {
            // visually indicate who the current player is
            if (state.currentPlayer === "x") {
                oSymbol.className = "players";
                xSymbol.className = "players active";
            } else if (state.currentPlayer === "o") {
                xSymbol.className = "players";
                oSymbol.className = "players active";
            }

            // show x or o symbol in the box
            boxes.forEach(function(box, index) {
                box.style.backgroundImage = "";
                if (state.board[index] === "x") {
                    box.setAttribute("class", "box box-filled-2");
                } else if (state.board[index] === "o") {
                    box.setAttribute("class", "box box-filled-1");
                } else {
                    box.setAttribute("class", "box");
                }
            });

            // show the win screens when the game is over
            if (state.winner !== null) {
                boardDiv.style.display = "none";
                endGameDiv.style.display = "block";
                if (state.winner === "o") {
                    screenWin.setAttribute(
                        "class",
                        "screen screen-win screen-win-one"
                    );
                    screenMessage.innerText = "Winner: Computer";
                } else if (state.winner === "x") {
                    screenWin.setAttribute(
                        "class",
                        "screen screen-win screen-win-two"
                    );
                    screenMessage.innerText = "Winner: " + userName.value.substring(0, 30);
                } else {
                    screenWin.setAttribute(
                        "class",
                        "screen screen-win screen-win-tie"
                    );
                    screenMessage.innerText = "It's a Tie!";
                }
            }
        }

        // set up the board
        function setUp() {
            boxes.forEach(function(box, index) {
                box.setAttribute("data-index", index);
                box.addEventListener("click", function(event) {
                    if (state.currentPlayer === "o") return;

                    // if the box is already filled, stop! hammer time
                    if (box.getAttribute("class").indexOf("filled") > -1) {
                        return;
                    }

                    state.board[event.target.getAttribute("data-index")] =
                        state.currentPlayer;
                    state.winner = checkWinner(state.board);
                    state.currentPlayer =
                        state.currentPlayer === "x" ? "o" : "x";
                    render();
                    // make the bot appear to be thinking before placing its symbol
                    setTimeout(function () {
                        botTurn(state.board, state.currentPlayer);
                        state.winner = checkWinner(state.board);
                        state.currentPlayer =
                            state.currentPlayer === "x" ? "o" : "x";

                        render();
                    }, 100 + Math.random() * 1000);
                });

                // hovering on an empty square, shows x or o.
                box.addEventListener("mouseover", function(event) {
                    if (box.getAttribute("class").indexOf("filled") > -1) {
                        return;
                    }
                    event.target.style.backgroundImage =
                        state.currentPlayer === "x"
                            ? "url('img/x.svg')"
                            : "url('img/o.svg')";
                });

                box.addEventListener("mouseout", function(event) {
                    if (box.getAttribute("class").indexOf("filled") > -1) {
                        return;
                    }
                    event.target.style.backgroundImage = "";
                });
            });

            // attach the user's name to the board
            function appendName() {
                var nameLabel = document.createElement("div");
                nameLabel.textContent = "Computer";
                document.getElementById('player1').appendChild(nameLabel);

                nameLabel = document.createElement("div");
                nameLabel.textContent = userName.value.substring(0, 30);
                document.getElementById('player2').appendChild(nameLabel);
            };

            // show the board when the start button is clicked
            startButton.addEventListener("click", () => {
                appendName();
                startDiv.style.display = "none";
                boardDiv.style.display = "block";
                reset();
            });

            // reset game when user clicks win screen button
            screenWinButton.addEventListener("click", () => {
                reset();
                render();
                endGameDiv.style.display = "none";
                boardDiv.style.display = "block";
            });
        }
        setUp();

        /*
            The bot creates new boards recursively and calculates the move that
            earns it the most points, then it plays that move
        */
        function botTurn(board, player, depth) {
            if (typeof depth === "undefined") depth = 0;

            var otherPlayer = player === "x" ? "o" : "x";

            if (checkWinner(board) === otherPlayer) {
                return -10;
            }
            if (boardFull(board)) {
                return 0;
            }

            var turn = player === "x" ? "x" : "o";
            var maxScore = -Infinity;
            var index = 0;

            // recursively making new boards and calculating the moves
            for (var x = 0; x < 9; x++) {
                if (typeof board[x] === "undefined") {
                    var newBoard = board.slice();
                    newBoard[x] = turn;

                    var moveScore = -botTurn(newBoard, otherPlayer, depth + 1);

                    if (moveScore > maxScore) {
                        maxScore = moveScore;
                        index = x;
                    }
                }
            }

            // if we are back in our first call to this function, actually do the move
            if (depth === 0) {
                state.board[index] = player;
            }

            return maxScore;
        }
    });
})();
