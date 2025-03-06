const buttons = document.querySelectorAll(".button");
const resultElements = document.querySelector(".result");
const playerScoreElements = document.querySelector("#user-score");
const computerScoreElements = document.querySelector("#computer-score");
const restartBtn = document.querySelector(".restart-btn");

let playerScore = 0;
let computerScore = 0;

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const result = playRound(button.id, computerPlay());
        resultElements.textContent = result;
    })
})


const computerPlay = () => {
    const choices = ["rock", "paper", "scissors"];
    const randomChoices = Math.floor(Math.random() * choices.length);
    return choices[randomChoices];
}

const playRound = (playerSelection, computerSelection) => {
    
    if(playerSelection === computerSelection){
        return "It's a tie!";
    }else if(
        (playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")
    ){
        playerScore++;
        playerScoreElements.textContent = playerScore;
        checkWin();
        return "You Win! " + playerSelection + " beats " + computerSelection;
    }else {
        computerScore++;
        computerScoreElements.textContent = computerScore;
        checkWin();
        return "You Lose! " + computerSelection + " beats " + playerSelection;
    }
    

}

const checkWin = () => {
    if(playerScore == 5 || computerScore == 5){
        buttons.forEach((button) => {
            button.disabled = true;
        });
        restartBtn.style.display = "block";
       
    }
}
const resetGame = () => {
    playerScore = 0;
    computerScore = 0;
    playerScoreElements.textContent = playerScore;
    computerScoreElements.textContent = computerScore;
    restartBtn.style.display = "none";
    buttons.forEach((button) => {
        button.disabled = false;
    })
}

restartBtn.addEventListener("click", resetGame);