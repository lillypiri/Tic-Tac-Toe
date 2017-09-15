// code is wrapped in a single self-invoking function
(function () {
    document.addEventListener('DOMContentLoaded', () => {
        var boardDiv = document.getElementById('board');
        boardDiv.style.display = 'none';

        var xSymbol = document.getElementById('player2');
        var oSymbol = document.getElementById('player1');

        var startDiv = document.getElementById('start');
        var startButton = document.querySelector('.button');

        var boxes = [].slice.call(document.getElementsByClassName('box'), 0);

        var state = {
            currentPlayer: 'x',
            board: Array(9).map(function () {
                return null;
            })
        }

        function reset() {
            state = {
                currentPlayer: 'x',
                board: Array(9).map(function () {
                    return null;
                })
            }
        }

        function render() {
            if (state.currentPlayer === 'x') {
                oSymbol.className = 'players';
                xSymbol.className = 'players active';
                for (var i = 0; i < boxes.length; i++) {
                    boxes[i].addEventListener('mouseover', function(event) {
                    event.target.style.backgroundImage = "url('img/x.svg')";
                })
            }
            for (var i = 0; i < boxes.length; i++) {
                boxes[i].addEventListener('mouseout', function(event) {
                    event.target.style.backgroundImage = "";
                })
            }
            } else if (state.currentPlayer === 'o') {
                xSymbol.className = 'players';
                oSymbol.className = 'players active';
                for (var i = 0; i < boxes.length; i++) {
                    boxes[i].addEventListener('mouseover', function(event) {
                        event.target.style.backgroundImage = "url('img/o.svg')";
                    })
                }

                for (var i = 0; i < boxes.length; i++) {
                    boxes[i].addEventListener('mouseout', function(event) {
                        event.target.style.backgroundImage = "";
                    })
                }
            }
            console.log(state.board);
            boxes.forEach(function (box, index) {
                if (state.board[index] === 'x') {
                    box.setAttribute('class', 'box box-filled-2');
                } else if (state.board[index] ==='o') {
                    box.setAttribute('class', 'box box-filled-1');
                } else {
                    box.setAttribute('class', 'box');
                }

            })
        }

        function setUp() {
            boxes.forEach( function (box, index) {
                box.setAttribute('data-index', index);
                box.addEventListener('click', function(event) {
                    state.board[event.target.getAttribute('data-index')] = state.currentPlayer;
                    state.currentPlayer = state.currentPlayer === 'x' ? 'o' : 'x';
                    render();
                })
            })
        }

        setUp();
        // show the board when the start button is clicked
        startButton.addEventListener('click', () => {
            startDiv.style.display = 'none';
            boardDiv.style.display = 'block';
            reset();
        });

    });
})();
