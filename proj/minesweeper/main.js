'use strict';

//Setting global variables.
var gLevel = {
    SIZE: 4,
    MINES: 2
};
var gState;
var gBoard;
var minesCoords;

var gTimer = 0;
var totalSeconds = 0;
initGame("Easy");


//Start the game on page load:
function initGame(level) {
    //Levels of the game:
    if (level === "Easy") {
        gLevel = {
            SIZE: 4,
            MINES: 2
        };
    } else if (level === "Medium") {
        gLevel = {
            SIZE: 6,
            MINES: 5
        };
    } else if (level === "Hard") {
        gLevel = {
            SIZE: 8,
            MINES: 15
        };
    }
    //state of mine count (mine count):
    gState = {
        markedCount: gLevel.MINES,
    };
    //general globals nullification:
    gBoard = [];
    minesCoords = [];

    //show mine counter before changing it:
    var strHTML = '';
    var elMat = document.querySelector('.mineCount');
    strHTML = "Mine Count: " + gState.markedCount; 
    elMat.innerHTML = strHTML;

    //show timer before it changes as gamestarts onclick:
    document.getElementById("timer").innerHTML = "0 Mins" + " : " + "0 Secs";
    document.querySelector('.gameBoard').innerHTML = '';

    //build the board then render it to DOM:
    buildBoard(gLevel.SIZE, gLevel.MINES);
    renderBoard(gBoard);
}

//Building the board:
function buildBoard(size, mines) {
    var mineCount = mines;

    //randomly find cells to put the number of bombs in it:
    for (var x = 0; x < mineCount; x++) {
        var valid = false;
        var row = getRandomInt(0, size - 1);
        var col = getRandomInt(0, size - 1);
        while (checkMinePosition(minesCoords, row, col)) {
            row = getRandomInt(0, size - 1);
            col = getRandomInt(0, size - 1);
        }
        minesCoords.push({ row: row, col: col });
    }
    //build the matrix while applying mines in it (or mine or empty cells):
    for (var i = 0; i < gLevel.SIZE; i++) {
        gBoard[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            var mineCell = checkMinePosition(minesCoords, i, j);
            if (mineCell) {
                gBoard[i][j] = '&#128163;';
            } else {
                gBoard[i][j] = '';
            }
        }
    }
    //set the numbers around the mines:
    console.log(gBoard)
    setMinesNegsCount(minesCoords);
}

// checking mine position and determining their coordinates:
function checkMinePosition(minesCoords, row, col) {
    var found = false;
    for (var t = 0; t < minesCoords.length; t++) {
        if (minesCoords[t].row === row && minesCoords[t].col === col) {
            found = true;
        }
    }
    return found;
}

//Rendering the game board model to the DOM:
function renderBoard() {

    var strHtml = '';
    for (var i = 0; i < gLevel.SIZE; i++) {
        var row = gBoard[i];
        strHtml += '<tr>';

        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            // console.log(cell)
            var className = cell;
            var tdId = 'cell-' + i + '-' + j;
            strHtml += '<td id="' + tdId + '" onclick = "cellClicked(this, ' + i + ',' + j + ')" ' +
                '"class' + className + '><span>' + cell + '</span></td>';
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.gameBoard');
    elMat.innerHTML = strHtml;
}


//function for checking for the neighbours of mines and implamenting numberes in surrounding cells:
function setMinesNegsCount(minesCoords) {
    var row = 0;
    var col = 0;
    //going over cells around mines, if valid and are empty and not mines add numbers (+1):
    for (var i in minesCoords) {
        row = minesCoords[i].row;
        col = minesCoords[i].col;
        if (isValid(row - 1, col - 1) && isEmptyCell(row - 1, col - 1)) gBoard[row - 1][col - 1]++;
        if (isValid(row + 1, col) && isEmptyCell(row + 1, col)) gBoard[row + 1][col]++;
        if (isValid(row - 1, col + 1) && isEmptyCell(row - 1, col + 1)) gBoard[row - 1][col + 1]++;
        if (isValid(row, col - 1) && isEmptyCell(row, col - 1)) gBoard[row][col - 1]++;
        if (isValid(row, col + 1) && isEmptyCell(row, col + 1)) gBoard[row][col + 1]++;
        if (isValid(row + 1, col - 1) && isEmptyCell(row + 1, col - 1)) gBoard[row + 1][col - 1]++;
        if (isValid(row - 1, col) && isEmptyCell(row - 1, col)) gBoard[row - 1][col]++;
        if (isValid(row + 1, col + 1) && isEmptyCell(row + 1, col + 1)) gBoard[row + 1][col + 1]++;

    }
}

//function checks if cell is empty:
function isEmptyCell(i, j) {
    if (gBoard[i][j] === '&#128163;') {
        return false;
    } else {
        return true;
    }
}
//function checks if cell is not out of bounds:
function isValid(i, j) {
    if (i < 0 || j < 0 || i > gLevel.SIZE - 1 || j > gLevel.SIZE - 1) {
        return false;
    } else {
        return true;
    }
}

//function checks cells and returns what is in the cell:
function getCellsStatus(i, j) {
    if (gBoard[i][j] === '&#128163;') {
        return 'boom';
    } else if (gBoard[i][j] === '') {
        return 'empty';
    } else {
        return 'number';
    }
}

//function ends game and reveals all cells, stops timer:
function gameOver() {
    var strHtml = '';
    var id;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            id = "#cell-" + i + '-' + j;
            document.querySelector(id).children[0].style.display = 'inline';
        }
    }
    clearInterval(gTimer);
    strHtml = '&#9785;';
    var elLine = document.querySelector('h2');
    elLine.innerHTML = strHtml;
}

//function reveals cell clicked, ends game if mine, displays adjascent cells if empty, reveals number if number:
function cellClicked(elCell, i, j) {
    var id;
    if (!gTimer) gTimer = setInterval(countTimer, 1000);
    id = "#cell-" + i + '-' + j;
    document.querySelector(id).style.backgroundImage = "url(images/lightgreytile.jpg)";

    var status = getCellsStatus(i, j);

    if (status === 'boom') {
        gameOver();
    } else if (status === 'empty') {
        displayAdjascentCells(i, j);
    } else if (status === 'number') {
        elCell.children[0].style.display = 'inline';
    }
}
//function for right clicking and applying flag and displays game win message if game is over:
document.addEventListener('mousedown', function (e) {
    //apply only on td element (must be in Capitals!)
    if (e.target.tagName === "TD") {
        //checks if right click:
        if (e.which === 3) {
            var tdId = e.target.id.split('-');
            var status = getCellsStatus(parseInt(tdId[1]), parseInt(tdId[2]));
            if (status === 'boom') {
               gState.markedCount--;
               var strHtml = '';
               var elMat = document.querySelector('.mineCount');
               strHtml = "Mine Count: " + gState.markedCount; 
                 elMat.innerHTML = strHtml;
                 if(gState.markedCount === 0){
                    strHtml = "YOU WON THE GAME!! KOL HAKAVOD!"
                    elMat.innerHTML = strHtml;
                 }

            }
            e.target.innerHTML = '&#9873;';
        }
    }
    });


//function for displaying the adjascent cells if cell clicked is empty:

function displayAdjascentCells(row, col) {
    var radius = 4;
    for (var i = (row - radius); i <= (row + radius); i++) {
        for (var j = (col - radius); j <= (col + radius); j++) {
            if (isValid(i, j)) {
                if (gBoard[i][j] === '') {
                    var id = "#cell-" + (i) + '-' + (j);
                    var elCell = document.querySelector(id);
console.log (id);

                elCell.style.backgroundImage= "url(images/lightgreytile.jpg)";
                elCell.children[0].style.display = 'inline';
                }
            }
        }
    }
}

//function countsup timer and displays timer on DOM:
function countTimer() {
    ++totalSeconds;
    var minute = Math.floor((totalSeconds - Math.floor(totalSeconds / 3600) * 3600) / 60);
    var seconds = totalSeconds - (Math.floor(totalSeconds / 3600) * 3600 + minute * 60);

    document.getElementById("timer").innerHTML = minute + " Mins " + ": " + seconds + " Secs ";
}

//Utility random number:
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}