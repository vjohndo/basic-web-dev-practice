const player1ImageElement = document.querySelector(".img1");
const player2ImageElement = document.querySelector(".img2");
const titleElement = document.querySelector("h1");

const diceRoll1 = Math.floor(Math.random()*6) + 1;
const diceRoll2 = Math.floor(Math.random()*6) + 1;

function updateDiceImages(diceRoll1, diceRoll2) {
    player1ImageElement.setAttribute("src", "images/dice" + diceRoll1 + ".png");
    player2ImageElement.setAttribute("src", "images/dice" + diceRoll2 + ".png");
}

function updateResult(diceRoll1, diceRoll2) {
    titleElement.textContent = getWinnerResult(diceRoll1, diceRoll2)
}

function getWinnerResult(diceRoll1, diceRoll2) {
    if (diceRoll1 === diceRoll2) {
        return "Draw!";
    } else if (diceRoll1 > diceRoll2) {
        return "🚩Player 1 Wins!";
    } else {
        return "Player 2 Wins!🚩";
    }
}

updateDiceImages(diceRoll1, diceRoll2);
updateResult(diceRoll1, diceRoll2);