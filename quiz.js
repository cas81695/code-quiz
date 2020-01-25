// the variable refers back to the home page

var quizContent = `

    <h1>How well do you know Coding?</h1>
    
    <p> You will have 75 seconds to complete 5 question (each worth 20 points) that will test your knowledge of Coding.
    Click the start button at the bottom of the page to start the quiz.</p>
    <p> If the answer you select is incorrect, then the timer will decrease 15 seconds</p>

    <button onclick="start()">Start!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
;


// These variables are for the functions of the quiz such as the timer, score, seconds in the timer


var score = 0;
var currentQuestion = -1;
var secondsLeft = 0;
var timer;

//This starts the timer once user clicks the 'start' button at 75 seconds

function startTimer() {

    secondsLeft = 75;

    document.getElementById("secondsleft").innerHTML = secondsLeft;

    timer = setInterval(function() {
        secondsLeft--;
        document.getElementById("secondsLeft").innerHTML = secondsLeft;
        //this ends the quiz when timer is below 0 at any time
        if (secondsLeft <= 0) {
            clearInterval(timer);
            finishQuiz(); 
        }
    }, 1000);

    next();
}


//The timer stops when the quiz is finished

function finishQuiz() {
    clearInterval(timer);

    var quizContent = `
    <h2>Nice Job, you finished the quiz</h2>
    <h3>You got a ` + score + ` </h3>

    <input type="text" id="name" placeholder="intials"> 

    <button onclick="setScore()">Set score!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//This stores the scores on a local storage with the player's name

function addScore() {

    localStorage.setItem("highscore", score);

    localStorage.setItem("playerName",  document.getElementById('name').value);
    
    getScore();
}


function displayScore() {
    var quizContent = `
    <h2>` + localStorage.getItem("playerName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 
    
    <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>
    
    `;

    document.getElementById("quizBody").innerHTML = quizContent;
}

// This clears the players name and value if the player selects 'remove score'

function removeScore() {

    localStorage.setItem("highscore", "");

    localStorage.setItem("playerName",  "");

    restartQuiz();
}

// this restarts the quiz for the player 
function restartQuiz() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    secondsLeft = 0;
    timer = null;

    document.getElementById("secondsLeft").innerHTML = secondsLeft;

    var quizContent = `

    <h1>How well do you know Coding?</h1>
    
    <p> You will have 75 seconds to complete 5 question (each worth 20 points) that will test your knowledge of Coding.
    Click the start button at the bottom of the page to start the quiz.</p>
    <p> If the answer you select is incorrect, then the timer will decrease 15 seconds</p>

    <button onclick="start()">Start!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}
   
//removes 15 seconds from the timer if player picks the wrong answer
function incorrect() {
    timeLeft -= 15; 
    next();
    // the quiz will move on to the next question after timer removal
}

//increases the score by 20 points if the player picks the correct answer
function correct() {
    score += 20;
    next();
}

//This loops through the questions 
function next() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        finishQuiz();
        return;
    }

    var quizContent = "<h4>" + questions[currentQuestion].title + "</h4>"
// this indicates what
    for (var questionLoop = 0; questionLoop < questions[currentQuestion].choices.length; questionLoop++) {
        var playerPick = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        playerPick = playerPick.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            playerPick = playerPick.replace("[ANS]", "correct()");
        } else {
            playerPick = playerPick.replace("[ANS]", "incorrect()");
        }
        quizContent += playerPick
    }


    document.getElementById("quizBody").innerHTML = quizContent;
}
