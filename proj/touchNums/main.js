'use strict';
var gNums = []
var CURR_NUM;
var lastNum;
var gSize;
var gTimer;
var totalSeconds;
var gLastClicked;

initGame(4);

function initGame(size) {
    
    gSize = (size)? size : 4;
    gNums = createNums(gSize);
    CURR_NUM = 1;
    lastNum = size*size;
    gTimer = 0;
    totalSeconds = 0;
    renderNumbers(gNums);
}

function countTimer() {
    ++totalSeconds;
    var minute = Math.floor((totalSeconds - (Math.floor(totalSeconds / 3600)) * 3600) / 60);
    var seconds = totalSeconds - (Math.floor(totalSeconds / 3600)) * 3600 + minute * 60;
    var elTimer = document.querySelector(".timer");
    elTimer.innerHTML = minute + ' mins' + ":" + seconds + ' secs';
}


function createNums (size){
    var nums = [];
    for (var i = 1; i <= size*size; i++){
        nums.push(i);
    }

    shuffle(nums);
    return nums;
}

function renderNumbers(nums) {
    var elTblNums = document.querySelector('.tbl-numbers');
    var strHtml = '';
    

    for (var i = 0; i < gSize; i++) {
        strHtml += '<tr>';
        for (var j = 0; j <gSize ; j++) {
            var num = nums.pop();
            strHtml += '<td onclick="numsClicked(this, ' + num + ')">' + num + '</td>';
        }
        strHtml += '</tr>';
    }
    elTblNums.innerHTML = strHtml;
}




function shuffle(items) {
    var j, tempItem, i;
    for (i = items.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        tempItem = items[i];
        items[i] = items[j];
        items[j] = tempItem;
    }
    return items;
}


function numsClicked(elRow, num) {
    var elUsrMsg = document.querySelector('.user-message');
    var strHtml;
    num = parseInt(num);
    if (!gTimer) gTimer = setInterval(countTimer, 1000);
    if (num === CURR_NUM) {
        CURR_NUM += 1
        elRow.classList.add('selected')
        strHtml = '<h4> Click a number! </h4>'
    } else {
        strHtml = '<h4> Wrong Number! </h4>'
    }
gLastClicked = num-1;
    if (num === lastNum && num-1 === gLastClicked) {
        strHtml = '<h4> YOU WON THE GAME! YEY!</h4>'
        clearInterval(gTimer);
    }

    elUsrMsg.innerHTML = strHtml;
}


function resetGame(size) {
    clearInterval(gTimer);
    initGame(size);
}

