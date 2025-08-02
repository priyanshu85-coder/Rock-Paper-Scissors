// Modal and Player Name elements
const modal = document.querySelector("#modal");
const startGameBtn = document.querySelector("#start-game-btn");
const playerNameInput = document.querySelector("#player-name-input");
const gameContainer = document.querySelector("#game-container");
const playerNameLabel = document.querySelector("#player-name-label");

// Game variables
let userScore = 0;
let compScore = 0;
let maxChances = 10;
let roundsPlayed = 0;
let playerName = "Player 1";
let gameActive = true;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const resetButton = document.querySelector("#reset-button");

// Function to start the game from the modal
startGameBtn.addEventListener("click", () => {
    const name = playerNameInput.value.trim();
    if (name) {
        playerName = name;
    }
    playerNameLabel.innerText = playerName;
    modal.style.display = "none";
    gameContainer.style.display = "block";
    resetGame();
});

const genComputerChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const applyWinnerAnimation = (winningChoice) => {
    const winnerElement = document.querySelector(`#${winningChoice}`);
    winnerElement.classList.add("winner-animation");
    setTimeout(() => {
        winnerElement.classList.remove("winner-animation");
    }, 1600); // Remove animation after it plays
};

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `${playerName} wins the round! ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
        applyWinnerAnimation(userChoice);
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `Player 2 wins the round! ${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor = "red";
        applyWinnerAnimation(compChoice);
    }
};

const drawGame = (userChoice) => {
    msg.innerText = `It's a draw! Both chose ${userChoice}`;
    msg.style.backgroundColor = "#081b31";
};

const endGame = () => {
    gameActive = false;
    let finalMessage = `Game Over! Final Score -> ${playerName}: ${userScore}, Player 2: ${compScore}.`;
    if (userScore > compScore) {
        finalMessage += ` ${playerName} wins the game!`;
    } else if (compScore > userScore) {
        finalMessage += " Computer wins the game!";
    } else {
        finalMessage += " It's a tie!";
    }
    msg.innerText = finalMessage;
    msg.style.backgroundColor = "#000";
};

const playGame = (userChoice) => {
    roundsPlayed++;
    const compChoice = genComputerChoice();

    if (userChoice === compChoice) {
        drawGame(userChoice);
    } else {
        let userWin = userChoice === "rock" ? compChoice === "scissors" :
                      userChoice === "paper" ? compChoice === "rock" :
                      compChoice === "paper";
        showWinner(userWin, userChoice, compChoice);
    }

    if (roundsPlayed >= maxChances) {
        setTimeout(endGame, 1600);
    } else {
        gameActive = false; // Disable clicks temporarily
        setTimeout(() => {
            msg.innerText = `${playerName}, make your move`;
            msg.style.backgroundColor = "#081b31";
            gameActive = true; // Re-enable clicks
        }, 1600);
    }
};

const handleClick = (event) => {
    if (!gameActive) return;
    const userChoice = event.currentTarget.getAttribute("id");
    playGame(userChoice);
};

function resetGame() {
    userScore = 0;
    compScore = 0;
    roundsPlayed = 0;
    gameActive = true;
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
    msg.innerText = `${playerName}, make your move`;
    msg.style.backgroundColor = "#081b31";
    choices.forEach(choice => choice.classList.remove("winner-animation"));
}

choices.forEach(choice => {
    choice.addEventListener("click", handleClick);
});

resetButton.addEventListener("click", resetGame);