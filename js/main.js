console.log('Starting up');

var gProjs =
    [
        {
            id: "guessNum",
            name: "Guess The Number Game",
            title: "Guess The Number",
            desc: "This fun project was designed to show one can have with JavaScript. The computer decides on a number which the user can guess, if the user guesses wrong the computer will tell the user whether the number is too low or too high until the user guesses the correct number. fun!",
            url: "portfolio/thumb/guessNum.jpg",
            publishedAt: "March 2018",
            labels: ["JavaScript", "Prompts"],
        },
        {
            id: "touchNums",
            name: "The Touch Numbers Game",
            title: "The Touch Numbers Game",
            desc: "In this game the user must click on the right order of numbers in the shortest time possible, it's a race against the clock! with three difficulty levels time passes quickly when you are having fun.",
            url: "portfolio/thumb/touchNum.jpg",
            publishedAt: "March 2018",
            labels: ["Matrixes", "Mouse Events"],
        },

        {
            id: "inPic",
            name: "In Picture Game",
            title: "What's in the Picture?",
            desc: "This fun game bounces a picture into the view of the user to grab attention. The user must guess what is in the picture by clicking one of two options. If he is correct a score is added, the button turns red or green according to the right or wrong answer and a message is displayed. A final score is displaed when the game is over. The question crab is waiting for you!",
            url: "portfolio/thumb/inPic.jpg",
            publishedAt: "March 2018",
            labels: ["CSS", "Mouse events"],
        },

        {
            id: "minesweeper",
            name: "Minesweeper",
            title: "Minesweeper game",
            desc: "This well built game provides hours of fun! just like the windows classic, you must click on empty tiles that have no mines. If a mine is clicked the game is over, the user loses. The mines are surrounded by numbers that show the user if a mine is close. The user can right-click to create a flag over tiles that are suspected to be mines, if the user covers all the mines they win!",
            url: "portfolio/thumb/minesweeper.jpg",
            publishedAt: "March 2018",
            labels: ["Matrixes", "Mouse events"],
        },

        {
            id: "sokoban",
            name: "Sokoban",
            title: "Better push those boxes",
            desc: "This game is based and named upon the classis Japanese Sokoban game. The user must travel the board with a Mario character to push boxes to their intended places. If the user gets stuck and cannot finish the level the game must be reset. The user wins when all the boxes are in their right place.",
            url: "portfolio/thumb/sokoban.jpg",
            publishedAt: "March 2018",
            labels: ["Matrixes", "Keyboard events"],
        },

        {
            id: "balloons",
            name: "Pop The Balloons!",
            title: "Classic Chess",
            desc: "Pop the Ballons! a simple fun game where balloons fly upwards and you must pop them in time, enjoy!.",
            url: "portfolio/thumb/pop-balloons.jpg",
            publishedAt: "March 2018",
            labels: ["CSS", "Mouse events"],
        },

    ];

$(document).ready(function () {
    initPage(gProjs);

    $('.formSub').click(function () {
        var subject = $('#subject').val();
        var email = $('#email').val();
        var message = $('#message').val();
        var url = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${message}`;
        window.location = url;
    })
});


function initPage(proj) {
    var strHtmlBoxes = '';
    gProjs.forEach(function innerHtml(proj, idx) {
        var strHtmlBox =
            `<div class="col-md-4 col-sm-6 portfolio-item">
                <a class="portfolio-link" data-toggle="modal" href="#${proj.id}">
                    <div class="portfolio-hover">
                        <div class="portfolio-hover-content">
                            <i class="fa fa-plus fa-3x"></i>
                        </div>
                    </div>
                    <img class="img-fluid" src="img/${proj.url}" >
                </a>
                <div class="portfolio-caption">
                    <h4>${proj.title}</h4>
                    <p class="text-muted">${proj.labels}</p>
                </div>
            </div>`;
        strHtmlBoxes += strHtmlBox;


        var strHtmlModal = `
        <div class="portfolio-modal modal fade" id="${proj.id}" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="close-modal" data-dismiss="modal">
              <div class="lr">
                <div class="rl"></div>
              </div>
            </div>
            <div class="container">
              <div class="row">
                <div class="col-lg-8 mx-auto">
                  <div class="modal-body">
                    <!-- Project Details Go Here -->
                    <h2>${proj.name}</h2>
                    <p class="item-intro text-muted">${proj.title}</p>
                    <img class="img-fluid d-block mx-auto" src="img/portfolio/full/${proj.id}.jpg" alt="">
                    <a class="btn btn-primary" href="proj/${proj.id}/index.html">
                    <i class="fa fa-play-circle"></i>
                        Link To Project</a>
                    <p>${proj.desc}
                    </p>
                    <ul class="list-inline">
                      <li>Published At: ${proj.publishedAt}</li>
                      <li>Client: Mr.Bit coding-academy</li>
                      <li>Category: Games</li>
                    </ul>
                    <button class="btn btn-primary" data-dismiss="modal" type="button">
                        <i class="fa fa-times"></i>
                        Close Project</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
        $('.modals').append(strHtmlModal);
    });
    $('.portfolio-items').html(strHtmlBoxes);
}




