// rules modal
const rulesBtn = document.querySelector(".rules-button");
const overlay = document.querySelector(".overlay");
const rules = document.querySelector(".rules-show");
const closeRulesBtn = document.querySelector(".hide-rules");
// game
const resetBtn = document.querySelector(".reset-game");
const rollDiceBtn = document.querySelector(".roll-dice");
const holdBtn = document.querySelector(".hold");
const dice = document.querySelector(".dices");
const playerOne = document.querySelector(".player.one");
const playerTwo = document.querySelector(".player.two");
const currentScore1 = document.getElementById("current-score-0");
const currentScore2 = document.getElementById("current-score-1");
const totalScore1 = document.getElementById("total-score-0");
const totalScore2 = document.getElementById("total-score-1");
let score1 = 0;
let score2 = 0;
const winner = document.createElement("p");
winner.className = "winner";
winner.append(document.createTextNode("🏆 Winner! 🎉"));
// rules modal
function toggleHiddenClass() {
    overlay.classList.toggle("hidden");
    rules.classList.toggle("hidden");
}
rulesBtn.addEventListener("click", toggleHiddenClass);
document.addEventListener("click", (e) => {
    if (e.target === overlay || e.target === closeRulesBtn) {
        toggleHiddenClass();
    }
});
// game events handlers
function displayCurrentScore(current, randomSource) {
    current.textContent = parseInt(current.textContent) + randomSource;
}
function switchPlayer() {
    if (playerOne.classList.contains("active")) {
        playerOne.classList.remove("active");
        playerTwo.classList.add("active");
    } else {
        playerTwo.classList.remove("active");
        playerOne.classList.add("active");
    }
}
function diceHandler(current, randomSource) {
    if (randomSource === 1) {
        current.textContent = "0";
        switchPlayer();
    } else {
        displayCurrentScore(current, randomSource);
    }
}
function holdHandler(score, current, total) {
    score = parseInt(current.textContent);
    total.textContent = parseInt(total.textContent) + score;
    current.textContent = "0";
    switchPlayer();
}
function checkWinner(total, player, otherPlayer) {
    if (parseInt(total.textContent) >= 100) {
        player.style.backgroundColor = "lightcoral";
        player.prepend(winner);
        rollDiceBtn.disabled = true;
        holdBtn.disabled = true;
        player.classList.add("active");
        otherPlayer.classList.remove("active");
    }
}
// -> on click dice roll button
rollDiceBtn.addEventListener("click", () => {
    let randomSource = Math.trunc(Math.random() * 6 + 1);
    dice.classList.remove("hidden");
    dice.setAttribute("src", `imgs/dice-${randomSource}.png`);
    if (playerOne.classList.contains("active")) {
        diceHandler(currentScore1, randomSource);
    } else {
        diceHandler(currentScore2, randomSource);
    }
});
// -> on click hold button

holdBtn.addEventListener("click", () => {
    if (playerOne.classList.contains("active")) {
        holdHandler(score1, currentScore1, totalScore1);
        checkWinner(totalScore1, playerOne, playerTwo);
    } else {
        holdHandler(score2, currentScore2, totalScore2);
        checkWinner(totalScore2, playerTwo, playerOne);
    }
});
// -> on click new game button
resetBtn.addEventListener("click", () => {
    location.reload();
});
