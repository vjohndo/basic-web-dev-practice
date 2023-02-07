const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;
let checkingAnswer = false;

$(document).keydown(function () {
    if (!started) {
        startOver();
        nextSequence();
        $("#level-title").text("Level " + level);
    }
});

function nextSequence() {
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;
    $("#level-title").text("Level " + level);
    userClickedPattern = [];
    checkingAnswer = false;
}

$(".btn").click(function() {
    const userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    // Prevent check while next sequence is being determined
    if (started && !checkingAnswer) {
        checkingAnswer = true;
        checkAnswer();
    }
})

function checkAnswer() {
    const currentIndex = userClickedPattern.length - 1;
    console.log(gamePattern.length, userClickedPattern.length);
    if (gamePattern.length === userClickedPattern.length && gamePattern[currentIndex] === userClickedPattern[currentIndex]) {
        setTimeout(nextSequence, 1000);
    } else if (gamePattern[currentIndex] !== userClickedPattern[currentIndex]) {
        started = false;
        $("#level-title").text("Game Over, Press Any Key To Restart");
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
    } else {
        checkingAnswer = false;
    }
}

function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    started = true;
}

function playSound(color) {
    const colorAudio = new Audio(`sounds/${color}.mp3`);
    colorAudio.play();
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");

    setTimeout(function () {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}