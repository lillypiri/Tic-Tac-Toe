// code is wrapped in a single self-invoking function
(function() {
    document.addEventListener("DOMContentLoaded", () => {
        var boardDiv = document.getElementById("board");
        boardDiv.style.display = "none";

        var xSymbol = document.getElementById("player2");
        var oSymbol = document.getElementById("player1");

        var startDiv = document.getElementById("start");
        var startButton = document.querySelector(".button");

        var boxes = [].slice.call(document.getElementsByClassName("box"), 0);

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
                    console.log(state.winner);
                }
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
            console.log(state.board);
            boxes.forEach(function(box, index) {
                if (state.board[index] === "x") {
                    box.setAttribute("class", "box box-filled-2");
                } else if (state.board[index] === "o") {
                    box.setAttribute("class", "box box-filled-1");
                } else {
                    box.setAttribute("class", "box");
                }
            });
            if (state.winner != null) {
                alert(state.winner + " wins");
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

            // show the board when the start button is clicked
            startButton.addEventListener("click", () => {
                startDiv.style.display = "none";
                boardDiv.style.display = "block";
                reset();
            });
        }
        setUp();
    });
})();
