// These variables are for the functions of the quiz such as the timer, score, seconds in the timer

var timer;

var secondsLeft = 0;

var score = 0;

var currentQuestion = -1;

//This starts the timer once user clicks the 'start' button at 75 seconds

function start() {

    secondsLeft = 75;

    document.getElementById("secondsLeft").innerHTML = secondsLeft;

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


//This loops through the questions 
function next() {

    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        finishQuiz();
        return;
    }

    var quizInfo = "<h4>" + questions[currentQuestion].title + "</h4>"
// this indicates what
    for (var questionLoop = 0; questionLoop < questions[currentQuestion].choices.length; questionLoop++) {

        var playerPick = "<button onclick=\"[Answer]\">[Choice]</button>"; 
        playerPick = playerPick.replace("[Choice", questions[currentQuestion].choices[questionLoop]);

        if (questions[currentQuestion].choices[questionLoop] == questions[currentQuestion].answer) {
            playerPick = playerPick.replace("[Answer]", "correct()");
        } else {
            playerPick = playerPick.replace("[Answer]", "incorrect()");
        }
        quizInfo += playerPick
    }
    document.getElementById("quizMain").innerHTML = quizInfo
}


//increases the score by 20 points if the player picks the correct answer
function correct() {
    score += 20;
    next();
}
   
//removes 15 seconds from the timer if player picks the wrong answer
function incorrect() {
    secondsLeft -= 15; 
    next();
    // the quiz will move on to the next question after timer removal
}

//The timer stops when the quiz is finished

function finishQuiz() {

    clearInterval(timer);

    var quizInfo = `
    <h5>Nice Job, you finished the quiz</h5>

    <h6>You got a ` + score + ` </h6>

    <input type="text" id="name" placeholder="intials"> 

    <button onclick = "setScore()" >Set score!</button>`;

    document.getElementById("quizMain").innerHTML = quizInfo;
}

//This stores the scores on a local storage with the player's name

function setScore() {

    localStorage.setItem("playerIntials",  document.getElementById('name').value);
    
    localStorage.setItem("highscore", score);

    displayScore();
}


function displayScore() {
    var quizInfo = ` 

    <h5>` + localStorage.getItem("playerIntials") + `'s highscore is:</h5>

    <h6>` + localStorage.getItem("highscore") + `</h6> 

    <br>
    
    
    <button onclick = "clearScore()" >Clear score</button><button onclick = "restartQuiz()" >Start again</button>`;

    document.getElementById("quizMain").innerHTML = quizInfo;
}

// This clears the players name and value if the player selects 'remove score'

function clearScore() {

    localStorage.setItem("playerIntials",  "");

    localStorage.setItem("highscore", "");


    restartQuiz();
}

// this restarts the quiz for the player 

function restartQuiz() {
    
    clearInterval(timer);

    timer = null;

    secondsLeft = 0;

    score = 0;

    currentQuestion = -1;
  

    document.getElementById("secondsLeft").innerHTML = secondsLeft;

    // the variable refers back to the home page
        var quizInfo = `

        <h1>How well do you know Coding?</h1>

        <p> You will have 75 seconds to complete 5 question (each worth 20 points) that will test your knowledge of Coding.
        Click the start button at the bottom of the page to start the quiz.</p>
        <p> If the answer you select is incorrect, then the timer will decrease 15 seconds</p>

        <button onclick="start()">Start!</button>`;

        document.getElementById("quizMain").innerHTML = quizInfo;
}

