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
        var xBox = document.getElementById('player2');
        var p = document.createElement("li");


        var state;

        function reset() {
            state = {
                currentPlayer: "x",
                board: Array(9).map(function() {
                    return null;
                }),
                winner: null
            };
        }

        function checkWinner() {
            const winningLines = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];

            for (let i = 0; i < winningLines.length; i++) {
                var a = winningLines[i][0];
                var b = winningLines[i][1];
                var c = winningLines[i][2];

                if (
                    state.board[a] &&
                    state.board[a] === state.board[b] &&
                    state.board[a] === state.board[c]
                ) {
                    state.winner = state.board[a];
                    // console.log(state.winner);
                }
            }
            if (
                state.board.filter(function(item) {
                    return item !== null;
                }).length === 9
            ) {
                state.winner = "";
            }
        }

        function render() {
            if (state.currentPlayer === "x") {
                oSymbol.className = "players";
                xSymbol.className = "players active";
            } else if (state.currentPlayer === "o") {
                xSymbol.className = "players";
                oSymbol.className = "players active";
            }
            // console.log(state.board);
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
            if (state.winner !== null) {
                boardDiv.style.display = "none";
                endGameDiv.style.display = "block";
                if (state.winner === "o") {
                    screenWin.setAttribute(
                        "class",
                        "screen screen-win screen-win-one"
                    );
                    screenMessage.innerText = "Winner";
                } else if (state.winner === "x") {
                    screenWin.setAttribute(
                        "class",
                        "screen screen-win screen-win-two"
                    );
                    screenMessage.innerText = "Winner: " + userName.value;
                } else {
                    screenWin.setAttribute(
                        "class",
                        "screen screen-win screen-win-tie"
                    );
                    screenMessage.innerText = "It's a Tie!";
                }
            }
        }

        function setUp() {
            boxes.forEach(function(box, index) {
                box.setAttribute("data-index", index);
                box.addEventListener("click", function(event) {
                    // if the box is filled, stop hammer time
                    if (box.getAttribute("class").indexOf("filled") > -1) {
                        return;
                    }
                    state.board[event.target.getAttribute("data-index")] =
                        state.currentPlayer;
                    checkWinner();
                    state.currentPlayer =
                        state.currentPlayer === "x" ? "o" : "x";
                    render();
                });

                // x hover over

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
                p.textContent = userName.value;
                xBox.appendChild(p);
            };



            // show the board when the start button is clicked
            startButton.addEventListener("click", () => {
                appendName();
                startDiv.style.display = "none";
                boardDiv.style.display = "block";
                reset();
            });

            screenWinButton.addEventListener("click", () => {
                reset();
                render();
                endGameDiv.style.display = "none";
                boardDiv.style.display = "block";
            });
        }
        setUp();
    });
})();
