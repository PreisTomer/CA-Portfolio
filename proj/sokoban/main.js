'use strict';

//Definition of td's (objects):

var EMPTY = {
    num: 0,
    symbol: '',
    className: 'empty'
};
var WALL = {
    num: 1,
    symbol: '',
    className: 'wall'
};
var BOX = {
    num: 2,
    symbol: '',
    className: 'box'
};
var PLAYER = {
    num: 10,
    symbol: '',
    className: 'player'
};
var TARGET = {
    num: 4,
    symbol: '',
    className: 'target'
};
var BOX_ON_TARGET = {
    num: -1,
    symbol: '',
    className: 'box-on-target'
};

var playerPosition = {
    row: 6,
    col: 2
};

var dimension;
var gBoard = [];
var gMovesCounter = 0;
var gWinCounter;
var PlayerOnTarget = false;
var boxes = 4;
innitGame();

function innitGame() {
    dimension = {
        WIDTH: 20,
        HEIGHT: 20
    };
    gWinCounter = 0;
    gBoard = [];
    PlayerOnTarget = false;
    //print move counter so you can see on load:
    var elMoveCounter = document.querySelector('.movesCounter');
    var strHTML = '';
    strHTML = "Move Counter: " + gMovesCounter;
    elMoveCounter.innerHTML = strHTML;
    //call build and render:
    buildBoard();
    renderBoard();
}

//function to reset the game:
function resetGame() {
    location.reload()
}

//manually build the board:
function buildBoard() {
    gBoard = [
        [WALL.num, WALL.num, WALL.num, WALL.num, WALL.num, WALL.num, WALL.num, WALL.num],
        [WALL.num, WALL.num, WALL.num, EMPTY.num, EMPTY.num, EMPTY.num, EMPTY.num, WALL.num],
        [WALL.num, TARGET.num, EMPTY.num, BOX.num, EMPTY.num, TARGET.num, WALL.num, WALL.num],
        [WALL.num, WALL.num, WALL.num, EMPTY.num, EMPTY.num, BOX.num, WALL.num, WALL.num],
        [WALL.num, TARGET.num, WALL.num, WALL.num, EMPTY.num, EMPTY.num, WALL.num, WALL.num],
        [WALL.num, EMPTY.num, WALL.num, EMPTY.num, EMPTY.num, EMPTY.num, WALL.num, WALL.num],
        [WALL.num, EMPTY.num, PLAYER.num, BOX.num, EMPTY.num, EMPTY.num, EMPTY.num, WALL.num],
        [WALL.num, EMPTY.num, EMPTY.num, EMPTY.num, BOX.num, EMPTY.num, TARGET.num, WALL.num],
        [WALL.num, WALL.num, WALL.num, WALL.num, WALL.num, WALL.num, WALL.num, WALL.num],
    ];
    console.log(gBoard);
}


//draw board to DOM
function renderBoard() {
    var strHTML = '';
    var className = "";
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j] === EMPTY.num) {
                className = 'empty';
            } else if (gBoard[i][j] === WALL.num) {
                className = 'wall';
            } else if (gBoard[i][j] === BOX.num) {
                className = 'box';
            } else if (gBoard[i][j] === PLAYER.num) {
                className = 'player';
            } else if (gBoard[i][j] === TARGET.num) {
                className = 'target';
            }
            strHTML += '<td class="' + className + '" id="cell-' + i + '-' + j + '"></td>';
        }
        strHTML += '</tr>';
    }
    document.querySelector('.table').innerHTML = strHTML;
}

function move(direction) {
    // If the next tile is valid for the player to move to:
    if (isValidMove(direction)) {
        //advance and print move counter:
        gMovesCounter++
        var elMoveCounter = document.querySelector('.movesCounter');
        var strHTML = '';
        strHTML = "Move Counter: " + gMovesCounter;
        elMoveCounter.innerHTML = strHTML;

        /******  before new position! ****** */

        //if player is on target:
        if (PlayerOnTarget === true) {
            gBoard[playerPosition.row][playerPosition.col] = TARGET.num;
            //change last position to target instead of Empty:
            var elId = '#cell-' + playerPosition.row + '-' + playerPosition.col;
            document.querySelector(elId).className = 'target';
            PlayerOnTarget = false;
        } else {
            // set current position of player to 'empty'
            gBoard[playerPosition.row][playerPosition.col] = EMPTY.num;
            // change the td's class to 'empty'
            var elId = '#cell-' + playerPosition.row + '-' + playerPosition.col;
            document.querySelector(elId).className = 'empty';
        }

        // set players new position (in data structure):
        if (direction === 'right') {
            playerPosition.col++;
        } else if (direction === 'left') {
            playerPosition.col--;
        } else if (direction === 'up') {
            playerPosition.row--;
        } else if (direction === 'down') {
            playerPosition.row++;

        }

        /********* PLAYER POSITION AFTER NEW POISTION *******************/

        // check if new position is a BOX position
        if (gBoard[playerPosition.row][playerPosition.col] === BOX.num) {
            var nextBoxCol = playerPosition.col;
            var nextBoxRow = playerPosition.row;
            // define the new box position if player moves it:
            if (direction === 'right') {
                nextBoxCol++;
            } else if (direction === 'left') {
                nextBoxCol--;
            } else if (direction === 'up') {
                nextBoxRow--;
            } else if (direction === 'down') {
                nextBoxRow++;
            }
            if (gBoard[nextBoxRow][nextBoxCol] === TARGET.num) {
                gBoard[nextBoxRow][nextBoxCol] = BOX_ON_TARGET.num;
                elId = '#cell-' + nextBoxRow + '-' + nextBoxCol;
                document.querySelector(elId).className = 'box-on-target';
                gWinCounter++
                isGameWin();            
            } else {
                // update the data structure and DOM (box moves)
                gBoard[nextBoxRow][nextBoxCol] = BOX.num;
                elId = '#cell-' + nextBoxRow + '-' + nextBoxCol;
                document.querySelector(elId).className = 'box';
            }
        }

        if (gBoard[playerPosition.row][playerPosition.col] === TARGET.num) {
            PlayerOnTarget = true;
        }
        // update the data structure with the new player position:
        gBoard[playerPosition.row][playerPosition.col] = PLAYER.num;
        // update DOM with new player position;
        elId = '#cell-' + playerPosition.row + '-' + playerPosition.col;
        document.querySelector(elId).className = 'player';

    }
}

function isGameWin (){
    if(gWinCounter === boxes ){
        alert('YOU WON THE GAME!')
    }
}



//function to check if next td is valid to move to:
function isValidMove(direction) {
    var nextPlayerRow = playerPosition.row;
    var nextPlayerCol = playerPosition.col;
    // define player's next position:
    if (direction === 'right') {
        nextPlayerCol++;
    } else if (direction === 'left') {
        nextPlayerCol--;
    } else if (direction === 'up') {
        nextPlayerRow--;
    } else if (direction === 'down') {
        nextPlayerRow++;
    }

    // player can only move to an empty td or target td:
    if (gBoard[nextPlayerRow][nextPlayerCol] === EMPTY.num || gBoard[nextPlayerRow][nextPlayerCol] === TARGET.num) {
        return true;
        // if player moves to a td with a box:
    } else if (gBoard[nextPlayerRow][nextPlayerCol] === BOX.num) {
        // check that the box can move to the next tile:
        var nextBoxCol = nextPlayerCol;
        var nextBoxRow = nextPlayerRow;
        if (direction === 'right') {
            nextBoxCol++;
        } else if (direction === 'left') {
            nextBoxCol--;
        } else if (direction === 'up') {
            nextBoxRow--;
        } else if (direction === 'down') {
            nextBoxRow++;
        }
        // box can move only if the next td is empty or target td:
        if (gBoard[nextBoxRow][nextBoxCol] === EMPTY.num || gBoard[nextBoxRow][nextBoxCol] === TARGET.num) {
            return true;
        }
    }
    return false;
}
//get cell i and j from cell id:

function getCellCoords(elId) {
    var cellCoords = elId.split('-');
    cellCoords.shift();
    cellCoords[0] = parseInt(cellCoords[0]);
    cellCoords[1] = parseInt(cellCoords[1]);
    return cellCoords;
}



document.addEventListener("keydown", function (event) {
    var KeyCode = event.which;
    var direction = '';

    if (KeyCode === 37) {
        direction = "left";
    } else if (KeyCode === 38) {
        direction = "up";
    } else if (KeyCode === 39) {
        direction = "right";
    } else if (KeyCode === 40) {
        direction = "down";
    }
    if (direction.length > 0) {
        move(direction);
    }
    console.log(KeyCode);
});