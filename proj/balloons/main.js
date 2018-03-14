'use strict';
console.log('Ex-03 - Balloon Pop');

var gTimer;
var totalSeconds;
var totalMins = 0;
var secs = 0;
var gPoppedCounter = 0;
var gBalloons;

initGame();

function initGame() {

    gBalloons = [
        { id: 1, bottom: 0, left: getRandomInt(0, 1200), speed: getRandomInt(20, 61), bg: getRandomInt(1, 3), intervalId: 0 },
        { id: 2, bottom: 0, left: getRandomInt(0, 1200), speed: getRandomInt(20, 61), bg: getRandomInt(1, 3), intervalId: 0 },
        { id: 3, bottom: 0, left: getRandomInt(0, 1200), speed: getRandomInt(20, 61), bg: getRandomInt(1, 3),intervalId: 0 },
        { id: 4, bottom: 0, left: getRandomInt(0, 1200), speed: getRandomInt(20, 61), bg: getRandomInt(1, 3),intervalId: 0 },
        { id: 5, bottom: 0, left: getRandomInt(0, 1200), speed: getRandomInt(20, 61), bg: getRandomInt(1, 3),intervalId: 0 },
        { id: 6, bottom: 0, left: getRandomInt(0, 1200), speed: getRandomInt(20, 61), bg: getRandomInt(1, 3),intervalId: 0 },
        { id: 7, bottom: 0, left: getRandomInt(0, 1200), speed: getRandomInt(20, 61), bg: getRandomInt(1, 3),intervalId: 0 },
        { id: 8, bottom: 0, left: getRandomInt(0, 1200), speed: getRandomInt(20, 61), bg: getRandomInt(1, 3),intervalId: 0 },
        { id: 9, bottom: 0, left: getRandomInt(0, 1200), speed: getRandomInt(20, 61), bg: getRandomInt(1, 3),intervalId: 0 },
        { id: 10, bottom: 0, left: getRandomInt(0, 1200), speed: getRandomInt(20, 61), bg: getRandomInt(1, 3),intervalId: 0 },
        { id: 12, bottom: 0, left: getRandomInt(0, 1200), speed: getRandomInt(20, 61), bg: getRandomInt(1, 3),intervalId: 0 },
        { id: 13, bottom: 0, left: getRandomInt(0, 1200), speed: getRandomInt(20, 61), bg: getRandomInt(1, 3),intervalId: 0 },
        { id: 14, bottom: 0, left: getRandomInt(0, 1200), speed: getRandomInt(20, 61), bg: getRandomInt(1, 3),intervalId: 0 },
        { id: 15, bottom: 0, left: getRandomInt(0, 1200), speed: getRandomInt(20, 61), bg: getRandomInt(1, 3),intervalId: 0 },
        { id: 16, bottom: 0, left: getRandomInt(0, 1200), speed: getRandomInt(20, 61), bg: getRandomInt(1, 3),intervalId: 0 },
        { id: 17, bottom: 0, left: getRandomInt(0, 1200), speed: getRandomInt(20, 61), bg: getRandomInt(1, 3),intervalId: 0 },
        { id: 18, bottom: 0, left: getRandomInt(0, 1200), speed: getRandomInt(20, 61), bg: getRandomInt(1, 3),intervalId: 0 },
        { id: 19, bottom: 0, left: getRandomInt(0, 1200), speed: getRandomInt(20, 61), bg: getRandomInt(1, 3),intervalId: 0 },
        { id: 20, bottom: 0, left: getRandomInt(0, 1200), speed: getRandomInt(20, 61), bg: getRandomInt(1, 3),intervalId: 0 }
    ];
    gTimer = 0;
    totalSeconds = 0;
    if (!gTimer) gTimer = setInterval(countTimer, 1000);
    var elSky = document.querySelector('.sky');
    var strHtml = '';
    for (var i = 0; i < gBalloons.length; i++) {
        strHtml = '<div onclick="pop(this)" class="balloon balloon' + gBalloons[i].id + '"></div>';
        elSky.innerHTML += strHtml;
    };
    var elBalloons = document.querySelectorAll('.balloon');
    var intervalId = 0;
    elBalloons.forEach(function (elBalloon, idx) {
        intervalId = setInterval(function () {
            elBalloon.style.left = gBalloons[idx].left + "px";
            elBalloon.style.bottom = gBalloons[idx].bottom + "px";
            gBalloons[idx].bottom += gBalloons[idx].speed;
        }, 1000);
        gBalloons[idx].intervalId = intervalId;
        elBalloon.style.backgroundImage = 'url(img/' + gBalloons[idx].bg + '.png)';
    });

}

function pop(elBalloon) {
    gPoppedCounter++;
    elBalloon.style.opacity = "0";
    setTimeout(function () {
        elBalloon.parentNode.removeChild(elBalloon);
    }, 300);

    if (gPoppedCounter === gBalloons.length) {
        alert('YOU WIN! Your time is: ' + totalMins +":"+ totalSeconds)
    }
}

function countTimer() {
    ++totalSeconds;
    ++secs;
    if (totalSeconds % 60 === 0) {
        totalMins++
        secs = 0;
    }
    var elTimer = document.querySelector(".timer");
    elTimer.innerHTML = totalMins + ' mins' + ":" + secs + ' secs';
}


function resetGame() {
    clearInterval(gTimer);

    gTimer = 0;
    totalSeconds = 0;
    totalMins = 0;
    secs = 0;
    var elSky = document.querySelector(".balloon");
    while (elSky.firstChild) {
        elSky.removeChild(elSky.firstChild);
    };
    for (var i = 0; i < gBalloons.length; i++) {
        clearInterval(gBalloons[i].intervalId);
    };

    initGame();
}



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
