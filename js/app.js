// code is wrapped in a single self-invoking function
(function () {
    document.addEventListener('DOMContentLoaded', () => {
        var boardDiv = document.getElementById('board');
        boardDiv.style.display = 'none';

        var xSymbol = document.getElementById('player2');
        var oSymbol = document.getElementById('player1');

        var startDiv = document.getElementById('start');
        var startButton = document.querySelector('.button');
        var xIsNext = true;
        // show the board when the start button is clicked
        startButton.addEventListener('click', () => {
            startDiv.style.display = 'none';
            boardDiv.style.display = 'block';
            xPlayer();
            xMouseOver();
        });
        console.log('outside - x is next', xIsNext);
        // players
        function xPlayer() {
                console.log('x is current player');
                oSymbol.setAttribute('class', 'players');
                xSymbol.setAttribute('class', 'players active');
                var xIsNext = false;
                console.log('its x turn, so x is not next', xIsNext);
            };

        function oPlayer() {
                console.log('o is current player');
                xSymbol.setAttribute('class', 'players');
                oSymbol.setAttribute('class', 'players active');
                var xIsNext = true;
                console.log('it is os turn, so x is next', xIsNext);
                oMouseOver();
            };

        var boardBoxOne = document.getElementsByTagName('li')[2];
        boardBoxOne.addEventListener('mouseover', () => {
            console.log('the system works');
            boardBoxOne.style.backgroundImage = "url('img/x.svg')";
        });
        boardBoxOne.addEventListener('mouseout', () => {
            boardBoxOne.style.backgroundImage = "";
        })

        boardBoxOne.addEventListener('click', () => {
            boardBoxOne.setAttribute('class', 'box box-filled-2');
            oPlayer();
            // xIsNext ? xPlayer() : oPlayer();
            console.log('xIsNext after click', xIsNext);
        });

        var liBoxes = document.getElementsByClassName('box');

        function xMouseOver() {
                for (var i = 0; i < liBoxes.length; i++) {
                liBoxes[i].addEventListener('mouseover', function(event) {
                    event.target.style.backgroundImage = "url('img/x.svg')";
                })
            }
            for (var i = 0; i < liBoxes.length; i++) {
                liBoxes[i].addEventListener('mouseout', function(event) {
                    event.target.style.backgroundImage = "";
                })
            }
        }

        function oMouseOver() {
            if (xIsNext = true) {
                for (var i = 0; i < liBoxes.length; i++) {
                    liBoxes[i].addEventListener('mouseover', function(event) {
                        event.target.style.backgroundImage = "url('img/o.svg')";
                    })
                }

                for (var i = 0; i < liBoxes.length; i++) {
                    liBoxes[i].addEventListener('mouseout', function(event) {
                        event.target.style.backgroundImage = "";
                    })
                }
            }
        }

        for (var i = 0; i < liBoxes.length; i++) {
            liBoxes[i].addEventListener('click', (event) => {
                event.target.setAttribute('class', 'box box-filled-2');
                oPlayer();
            });
        }
    });
})();
