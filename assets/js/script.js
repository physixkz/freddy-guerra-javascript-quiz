// Questions being asked
var questions = [
    {
        prompt: "Commonly used data types do not include?",
        choices: ["strings", "booleans", "alerts", "numbers"],
        correctanswer: "alerts"
    },
    {
        prompt: "The condition in an if / else statement is enclosed with___.",
        choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        correctanswer: "parenthesis"
    },
    {
        prompt: "Arrays in JavaScript can be used to store_____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correctanswer: "all of the above"
    },
    {
        prompt: "String values must be enclosed within _____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        correctanswer: "quotes"
    },
    {
        prompt: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        correctanswer: "console.log"
    },
];
//Track score
var score = 0;
var currentQuestionIndex = 0;
//Time Limit
var timeLimit = 60;
var timer;
//Starts quiz when start quiz button is clicked
function startQuiz() {
    document.getElementById("startButton").style.display = "none";
    displayQuestion();
    // Starts timer
    startTimer();
    console.log("Quiz started");
}
function displayQuestion() {
    var questionContainer = document.getElementById("questionContainer");
    questionContainer.innerHTML = "";

    if (currentQuestionIndex >= questions.length) {
        endQuiz();
        return;
    }

    var question = questions[currentQuestionIndex];
    questionContainer.textContent = question.prompt;

    var answerOptions = question.choices;

    for (var i = 0; i < answerOptions.length; i++) {
        var option = document.createElement("button");
        option.textContent = answerOptions[i];
        option.addEventListener("click", function(event) {
            checkAnswer(event.target.textContent);
        });
        questionContainer.appendChild(option);
    }
}
//Check if answer is correct or incorrect
function checkAnswer(selectedAnswer) {
    var question = questions[currentQuestionIndex];
    if (selectedAnswer === question.correctanswer) {
        score++;
    } else {
        // Time penalty
        timeLimit -= 10;
    }
    currentQuestionIndex++;
    updateScoreDisplay();
    displayQuestion();
}
function startTimer() {
    //Updates Timer
    updateTimerDisplay();

    timer = setInterval(function() {
        timeLimit--;
        updateTimerDisplay();
        if (timeLimit <= 0 || currentQuestionIndex >= questions.length) {
            endQuiz();
        }
    }, 1000);
}
function endQuiz() {
    clearInterval(timer);
    var resultContainer = document.getElementById("resultContainer");
    resultContainer.textContent = "Quiz is over. Your score: " + score;

    // Save score
    var initials = prompt("Please enter your initials:");
    var userScore = { initials: initials, score: score };
//Save score in local storage
    var highScores = [];
    if (localStorage.getItem("highScores")) {
        highScores = JSON.parse(localStorage.getItem("highScores"));
    }

    highScores.push(userScore);
    localStorage.setItem("highScores", JSON.stringify(highScores));

    // Display high score
    var highScoresContainer = document.getElementById("highScoresContainer");
    highScoresContainer.innerHTML = "High Scores:<br>";

    for (var i = 0; i < highScores.length; i++) {
        highScoresContainer.innerHTML += highScores[i].initials + ": " + highScores[i].score + "<br>";
    }

    // Shows restart button
    var restartButton = document.getElementById("restartButton");
    restartButton.style.display = "block";
}
//Restart quiz
function restartQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    timeLimit = 60;
    updateScoreDisplay();
    updateTimerDisplay();

    var restartButton = document.getElementById("restartButton");
    restartButton.style.display = "none";
    
    var startButton = document.getElementById("startButton");
    startButton.style.display = "block";

    // Clear high scores
    var highScoresContainer = document.getElementById("highScoresContainer");
    highScoresContainer.innerHTML = "";
}
    function updateScoreDisplay() {
    var scoreDisplay = document.getElementById("score");
    scoreDisplay.textContent = "Score: " + score;
}
function updateTimerDisplay() {
    var timerDisplay = document.getElementById("timer");
    timerDisplay.textContent = "Time: " + timeLimit + " seconds";
}
document.getElementById("startButton").addEventListener("click", startQuiz);
document.getElementById("restartButton").addEventListener("click", restartQuiz);