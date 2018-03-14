
var gBoard = createChessBoard();
var gSelectedCell = null;
var piece;
console.table(gBoard);
renderBoard(gBoard);


function createChessBoard() {
    var board = [];
    for (var i = 0; i < 8; i++) {
        board[i] = [];
        for (var j = 0; j < 8; j++) {
            board[i][j] = ''
        }
    }
    board[6][4] = '♟';
    board[4][2] = '♟';
    board[7][7] = '♜';
    board[1][2] = '♙';
    board[3][4] = '♖';
    board[7][5] = '♞';
    return board;
}

function renderBoard(board) {
    var elBoard = document.querySelector('.board');
    var strHtml = '';
    var isLight = true;

    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < board[0].length; j++) {

            var cellClass = (isLight) ? 'light' : 'dark'
            cellClass += ' cell-' + i + '-' + j;
            isLight = !isLight;

            strHtml += '<td onclick="cellClicked(this, ' + i + ',' + j + ')" class="' + cellClass + '">'
            strHtml += board[i][j];
            strHtml += '</td>'
        }
        isLight = !isLight;
        strHtml += '</tr>\n';
    }

    // console.log(strHtml);
    elBoard.innerHTML = strHtml;
}

function cellClicked(elCell, cellI, cellJ) {
    if (gSelectedCell) {
        gSelectedCell.classList.remove('selected');
        gSelectedCell = null;

    }
    removeMark();
    elCell.classList.add('selected');
    gSelectedCell = elCell;
    piece = elCell.innerHTML;
    switch (piece) {
        case '♟':
            markCellsForPawn(cellI, cellJ);
            break;
        case '♙':
            markCellsForPawn(cellI, cellJ, true);
            break;
        case '♜':
            markCellsForRook(cellI, cellJ);
            break;
        case '♖':
            markCellsForRook(cellI, cellJ, true);
            break;
        case '♞':
            markCellsForKnight(cellI, cellJ);
            break;
    }
}

function removeMark() {
    var elMark = document.querySelectorAll('.mark');
    for (var i = 0; i < elMark.length; i++) {
        elMark[i].classList.remove('mark');
    }
}


function markCellsForPawn(cellI, cellJ, isWhite) {
    if (!isWhite) {
        var selector = '.cell-' + (cellI - 1) + '-' + cellJ
        var elCell = document.querySelector(selector);
        if (elCell.innerHTML) return;
        elCell.classList.add('mark');
        if (cellI === 6) {
            selector = '.cell-' + (cellI - 2) + '-' + cellJ
            elCell = document.querySelector(selector);
            if (elCell.innerHTML) return;
            elCell.classList.add('mark');

        }
    } else {
        var selector = '.cell-' + (cellI + 1) + '-' + cellJ
        var elCell = document.querySelector(selector);
        if (elCell.innerHTML) return;
        elCell.classList.add('mark');
        if (cellI === 1) {
            selector = '.cell-' + (cellI + 2) + '-' + cellJ
            elCell = document.querySelector(selector);
            if (elCell.innerHTML) return;
            elCell.classList.add('mark');

        }

    }
}

function markCellsForRook(cellI, cellJ) {
    for (var i = cellI; i >= 1; i--) {
        var selector = '.cell-' + (i - 1) + '-' + cellJ
        var elCell = document.querySelector(selector);
        if (elCell.innerHTML) break;
        elCell.classList.add('mark');
    }
    for (var j = cellJ; j >= 1; j--) {
        var selector = '.cell-' + cellI + '-' + (j - 1)
        var elCell = document.querySelector(selector);
        if (elCell.innerHTML) break;
        elCell.classList.add('mark');

    }
    for (var i = cellI; i < 7; i++) {
        var selector = '.cell-' + (i + 1) + '-' + cellJ;
        var elCell = document.querySelector(selector);
        if (elCell.innerHTML) break;
        elCell.classList.add('mark');

    }
    for (var j = cellJ; j < 7; j++) {
        var selector = '.cell-' + cellI + '-' + (j + 1)
        var elCell = document.querySelector(selector);
        if (elCell.innerHTML) break;
        elCell.classList.add('mark');

    }
}

function markCellsForKnight(cellI, cellJ) {
    var selector = '.cell-' + (cellI - 2) + '-' + (cellJ + 1);
    var elKnight = document.querySelector(selector);
    if (elKnight && !elKnight.innerHTML) elKnight.classList.add('mark');

    selector = '.cell-' + (cellI - 2) + '-' + (cellJ - 1);
    elKnight = document.querySelector(selector);
    if (elKnight && !elKnight.innerHTML) elKnight.classList.add('mark');

    selector = '.cell-' + (cellI - 1) + '-' + (cellJ + 2);
    elKnight = document.querySelector(selector);
    if (elKnight && !elKnight.innerHTML) elKnight.classList.add('mark');

    selector = '.cell-' + (cellI + 1) + '-' + (cellJ + 2);
    elKnight = document.querySelector(selector);
    if (elKnight && !elKnight.innerHTML) elKnight.classList.add('mark');

    selector = '.cell-' + (cellI - 1) + '-' + (cellJ - 2);
    elKnight = document.querySelector(selector);
    if (elKnight && !elKnight.innerHTML) elKnight.classList.add('mark');

    selector = '.cell-' + (cellI + 1) + '-' + (cellJ - 2);
    elKnight = document.querySelector(selector);
    if (elKnight && !elKnight.innerHTML) elKnight.classList.add('mark');

    var selector = '.cell-' + (cellI + 2) + '-' + (cellJ + 1);
    var elKnight = document.querySelector(selector);
    if (elKnight && !elKnight.innerHTML) elKnight.classList.add('mark');

    var selector = '.cell-' + (cellI + 2) + '-' + (cellJ - 1);
    var elKnight = document.querySelector(selector);
    if (elKnight && !elKnight.innerHTML) elKnight.classList.add('mark');
}