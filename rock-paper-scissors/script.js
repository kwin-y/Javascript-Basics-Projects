// console.log("Hello World");
//console.log(Math.random());

function getComputerChoice(){ //random choices of rock, paper, scissors in console.log
    const randomNum = Math.random();

    if(randomNum < 1 / 3){
        return "rock";
    } else if(randomNum < 2 / 3){
        return "paper";
    } else {
        return "scissors";
    }
}

//console.log(getComputerChoice()); // checking if the function works

function getHumanChoice(){ //prompt user to input rock, paper, or scissors
    const choice = prompt("rock, paper, or scissors: ");
    return choice;
}

//console.log(getHumanChoice()); // checking if the function works

function playGame(){ //play game 5 times
//player score variables
let computerScore = 0;
let humanScore = 0;

// function to play a round of rock, paper, scissors
    function playRound(humanChoice, computerChoice) { 
        humanChoice = humanChoice.toLowerCase();

        if (humanChoice === computerChoice) {
            console.log("It's a tie!");
        } else if (
            (humanChoice === "rock" && computerChoice === "scissors") ||
            (humanChoice === "paper" && computerChoice === "rock") ||
            (humanChoice === "scissors" && computerChoice === "paper")
        ) {
            humanScore++;
            console.log(`You win! ${humanChoice} beats ${computerChoice}`);
        } else {
            computerScore++;
            console.log(`You lose! ${computerChoice} beats ${humanChoice}`);
        }
    }
    
    //loop to play 5 rounds of the game
    for(let i = 0; i < 5; i++) {
        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice();
        
        playRound(humanSelection, computerSelection);
    }

    console.log(`Human score: ${humanScore}`); // show human total score
    console.log(`Computer score: ${computerScore}`); // show computer total score

    if (humanScore > computerScore) {
    console.log("You win the game!");
    } else if (computerScore > humanScore) {
        console.log("You lose the game!");
    } else {
        console.log("The game is a tie!");
    }
}

// const humanSelection = getHumanChoice();
// const computerSelection = getComputerChoice();

// playRound(humanSelection, computerSelection);

playGame(); // calling the function to play the game