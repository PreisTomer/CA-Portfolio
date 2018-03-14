'use strict';

var gQuests = [
    { id: 1, opts: ['Telegraph', 'Phonograph'], correctOptIndex: 0 },
    { id: 2, opts: ['Cocker Spanial', 'Pug'], correctOptIndex: 1 },
    { id: 3, opts: ['Scorsase', 'Tarantino'], correctOptIndex: 0 }
];

var gMAX_QUESTS = gQuests.length;
var gCurrQuestIdx;
var gCorrectAnswers;


initGame();

function initGame() {
    var strHtml = '';
    var elAns = document.querySelector('h3');
    gCurrQuestIdx = 0;
    gCorrectAnswers = 0;
    strHtml = '<h3> Click on an Answer! </h3>';
    elAns.innerHTML = strHtml;
    renderQuest();
};

function renderQuest() {

    var elAns = document.querySelector('.option1');
    elAns.innerHTML = gQuests[gCurrQuestIdx].opts[0];
    var elAns2 = document.querySelector('.option2');
    elAns2.innerHTML = gQuests[gCurrQuestIdx].opts[1];

    var elQuestPic = document.querySelector('.questpic img')
    elQuestPic.className = 'questpic';
    setTimeout(function () {
        elQuestPic.className += ' bounce';
        elQuestPic.src = 'img/' + gQuests[gCurrQuestIdx].id + '.jpg';
    }, 0);



};

function checkAnswer(optIdx, elBtn) {
    var strHtml = '';
    var elAns = '';
    elAns = document.querySelector('h3');
    var correctIdx = gQuests[gCurrQuestIdx].correctOptIndex;
    elBtn.classList.add()

    if (correctIdx === optIdx) {
        elBtn.classList.add("correct");
        setTimeout(function () {
            elBtn.classList.remove("correct");
        }, 1000)
        strHtml = '<h3> Correct! </h3>';
        gCorrectAnswers++;

    } else {
        strHtml = '<h3> Wrong! </h3>';
        elBtn.classList.add("wrong");
        setTimeout(function () {
            elBtn.classList.remove("wrong");
        }, 1000)
    }

    gCurrQuestIdx++;

    if (gCurrQuestIdx < gQuests.length) {
        setTimeout(function () {
            renderQuest();
            strHtml = '<h3> Click on an Answer! </h3>';
            elAns.innerHTML = strHtml;
        }, 1000)

    } else {
        var score = (gCorrectAnswers / gQuests.length) * 100;
        strHtml = '<h3>Your Score is: <span>' + score.toFixed(2) + '</span> </h3>';
        strHtml += '<button class="bounce" onclick=clearGame()></button>';
    }

    elAns.innerHTML = strHtml;
}


function clearGame() {
    initGame();
}