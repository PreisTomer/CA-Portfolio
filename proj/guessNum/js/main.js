function guessNum() {
    var compGuess = getRandomInt(1, 5)
    var userGuess = prompt('What number did you guess?');
    var elUserPrompt = document.querySelector('.user-prompt');
    var strHtml = '';
   
    if (userGuess > compGuess) {
        strHtml = 'The number you chose is too high!';
    } else if (userGuess < compGuess) {
        strHtml = 'The number you chose is too low!';
    } else {
        strHtml = 'YOU CHOSE THE SAME NUMBER I CHOSE! HURRAY!!';
    }
    elUserPrompt.innerHTML = strHtml;
}



      


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}