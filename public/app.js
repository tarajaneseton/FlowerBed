const startButton = document.querySelector("#start-button");
const infoDisplay = document.querySelector("#info");
const hitsDisplay = document.querySelector("#hits");
const turnDisplay = document.querySelector("#turn-display");
const optionContainer = document.querySelector(".option-container"); // change to player-container
const rotateButton = document.querySelector("#rotate-button");

import { createBoard } from "./boards.js";

//creating the boards using  the imported createBoard function
const playerBoard = createBoard("green", "player");
const computerBoard = createBoard("darkseagreen", "computer");

// Rotate function to rotate the flowerbeds on button click
let angle = 0; // global variable to start the flowerbed's angle as 0
function rotate() {
  const optionFlowerbeds = Array.from(optionContainer.children); //takes the flowerbeds that are in the option container and places them in an array
  angle = angle === 0 ? 90 : 0; //checks if the angle is 0, if it is then it sets the angle to 90, if not then it sets the angle to 0
  optionFlowerbeds.forEach( //iterates over the optionFlowerbeds array
    (optionFlowerbed) => // and sets the transform style to rotate the flowerbeds based on the angle
      (optionFlowerbed.style.transform = `rotate(${angle}deg)`) // 
  );
};
rotateButton.addEventListener("click", rotate);

// A class to create the Flowerbeds
class Flowerbed {
  constructor(name, length) {
    this.name = name;
    this.length = length;
  };
};

// Creating the flowerbeds along with their length and name
const sunflower = new Flowerbed("sunflower", 6);
const tulip = new Flowerbed("tulip", 5);
const hibiscus = new Flowerbed("hibiscus", 4);
const hyacinth = new Flowerbed("hyacinth", 3);
const rose = new Flowerbed("rose", 2);

const flowerbeds = [sunflower, tulip, hibiscus, hyacinth, rose]; // placing the flowerbeds in an array called flowerbeds
let isPlaced; // creating a variable to check if the flowerbed has been placed

// function to create flowerbeds
function createFlowerbeds(user, flowerbeds) {
  const gameBoardContainer = document.getElementById(user); //selects the game board container based on the user

  if (!gameBoardContainer) {
    // if the game board container is not found, then log an error message
    console.error(`Game board container not found for user $(user)`);
    return;
  }

  // creating the flowerbeds
  for (const flowerbed of flowerbeds) {
    for (let i = 0; i < flowerbeds[flowerbed]; i++) { // iterates over the flowerbeds array
      //
      const block = document.createElement("div"); // creates a div element called a block to hold the flowerbed
      block.classList.add("flowerbed"); // adds a class to the block called flowerbed
      const coordinates = `${flowerbed}${i + 1}`; // assigns the coordinates to the block based on the flowerbed and the index
      block.dataset.coordinates = coordinates; //  adds the coordinates to the block
      block.textContent = coordinates; //  adds the coordinates to the block as text content
      gameBoardContainer.append(block); //appends the block to the game board container
    };
  };
};

// function to add the flowerbeds to the game board
function addFlowerbedPiece(user, flowerbeds, startId) { 

  const allBoardBlocks = document.querySelectorAll(`#${user} div.block`); // selecting all of the neighbour's blocks
  let randomBoolean = Math.random() < 0.5; // produces a random boolean value
  let isHorizontal = user === "player" ? angle === 90 : randomBoolean; // checks if the user is the player, if it is then it checks if the angle is 90, if not then it uses the randomBoolean value
  let randomStartIndex = Math.floor(Math.random() * 100); // creates a random start index based on the total size of the game board 
  let startIndex = startId ? startId : randomStartIndex; // checks if the startId is true and uses the startId, if not then it uses the randomStartIndex

  let validStart; // creating a variable to store the valid start index
  if (isHorizontal) {
    //Checks if the placement of the flowerbed is horizontal, and calculates a potential valid start for placing the flowerbed

    if (startIndex <= 100 - flowerbeds.length) { // if the startIndex is less than or equal to 100 - the length of the flowerbeds
      validStart = startIndex; // then the flowerbed will fit on the board at its startIndex and becomes a valid start 
    } else {
      validStart = 100 - flowerbeds.length; // if not true then the valid start is 100 - the length of the flowerbeds to ensure it will fit
    }
  } else {
    // If the flowerbed is vertical
    if (startIndex <= 100 - 10 * flowerbeds.length) { // if the startIndex is less than or equal to 100 - 10 * the length of the flowerbeds
      validStart = startIndex; // then the valid start is the startIndex
    } else {
      validStart = startIndex - flowerbeds.length * 10 + 10; // if not then the valid start is the startIndex - the length of the flowerbeds * 10 + 10
    }
  }

  let flowerbedBlocks = []; // creating an array to store the flowerbed blocks

  for (let i = 0; i < flowerbeds.length; i++) { // iterates over the flowerbeds array
    if (isHorizontal) { //
      flowerbedBlocks.push(allBoardBlocks[Number(validStart) + i]); // if the randomStartIndex is 5, then the first block will be 5, 6 and so on based on flowerbed.length
    } else {
      //if vertical
      flowerbedBlocks.push(allBoardBlocks[Number(validStart) + i * 10]); //if the randomStartIndex is 5, then the first block will be 5, 15 and so on based on flowerbed.length
    };
  };

  let valid;

  //A loop that keeps running to ensure that the placement of a flowerbed block is not placed on a 'taken'. 
  // It keeps running until the flowerbed is placed correctly on a not taken block.
  if (isHorizontal) { // if horizontal
    flowerbedBlocks.every( //uses the every method to iterate over the flowerbedBlocks array
      (_flowerbedBlock, index) => // and checks if the flowerbedBlock is valid
        (valid = 
          _flowerbedBlock.dataset.coordinates[1] !== // then checking that the valid variable of the flowerbedBlock's coordinates
          "10" - (flowerbedBlocks.length - (index + 1))) // do not go beyond the bottom edge of the board (on the y-axis this is 10)
    );
  } else {
    // if vertical
    flowerbedBlocks.every((_flowerbedBlock, index) => {
      const rowIndex = Math.floor(validStart / 10) + index;
      const columnIndex = validStart % 10; // calculates the column index based on the validstart position
      const row = rowIndex + 1; // calculates the row based on the rowIndex + 1

      valid = flowerbedBlocks[0].id < 90 + (10 * index + 1); // compares the id of the first block with 90 + (10 * index + 1) to ensure vertical
      // blocks are placed within a valid column range
    });
  };

  
  const notTaken = flowerbedBlocks.every(
    (flowerbedBlock) => !flowerbedBlock.classList.contains("taken")
  ); // checks if the flowerbedBlocks are not taken

  //if the valid variable above is valid, and the blocks are not taken then the flowerbed has been placed correctly 
    // and we can add the class name of taken to the flowerbedBlocks
  if (valid && notTaken) {
    flowerbedBlocks.forEach((flowerbedBlock) => {
      //iterates over the flowerbedBlocks and adds the name of the flowerbed to the flowerbedBlocks
      flowerbedBlock.classList.add(flowerbeds.name); 
      flowerbedBlock.classList.add("taken"); //
    });
  } else {
    if (user === "computer") { // if the user is the computer
      let placementAttempts = 0; // creating a variable to store the placement attempts
      const maxAttempts = 1000; // creating a variable to store the maximum attempts to avoid an infinite loop

      while (placementAttempts < maxAttempts) {
        // ... (Calculate random starting position, validate placement)
        if (valid && notTaken) {
          // Placement successful, break out of the loop
          break;
        };
        placementAttempts++;
      };

      if (placementAttempts === maxAttempts) {
        console.error(
          "Failed to place flowerbed for computer after",
          maxAttempts,
          "attempts"
        );
      };
    } else {
      if (user === "player") isPlaced = true; // if the user is the player then the isPlaced variable is set to true
    };
  };
};

flowerbeds.forEach((Flowerbed) => addFlowerbedPiece("computer", Flowerbed)); //iterates over each Flowerbed object in the flowerbeds array and 
// passes it to the addFlowerbedPiece function to be added to the board

// Placing the flowerbeds on the player board using drag and drop

let draggedFlowerbed; // creating a variable to store the dragged flowerbed

const optionFlowerbeds = Array.from(optionContainer.children); //taking the flowerbeds that are in the option container and placing them in an array
optionFlowerbeds.forEach((optionFlowerbed) =>
  optionFlowerbed.addEventListener("dragstart", dragStart)
); //iterating over the optionFlowerbeds array and adding an event listener to each option, which will call the dragStart function

const playerBlocks = document.querySelectorAll("#player div"); //selecting all of player one's blocks
playerBlocks.forEach((playerBlock) => {
  playerBlock.addEventListener("dragover", dragOver);
  playerBlock.addEventListener("drop", dropFlowerbed);
}); //iterating over the playerBlocks array and adding an event listener to each block, which will call the dragOver and dropflowerbed function

function dragStart(e) {
  //function to start the drag
  isPlaced = false;
  draggedFlowerbed = e.target; //assigning the target of the event to the draggedFlowerbed variable
};

function dragOver(e) {
  //function to drag over the flowerbed
  e.preventDefault(); //preventing the default action of the event
  const flowerbed = flowerbeds[draggedFlowerbed.id]; //assigning the flowerbeds to the draggedFlowerbed id
};

function dropFlowerbed(e) { //function to drop the flowerbed
  const startId = e.target.id; //assigning the target id to the startId variable
  const flowerbed = flowerbeds[draggedFlowerbed.id]; //assigning the flowerbeds to the draggedFlowerbed id
  addFlowerbedPiece("player", flowerbed, startId); //calling the addFlowerbedPiece function and passing the player, flowerbed and startId
  if (!isPlaced) { //if the flowerbed is not placed
    draggedFlowerbed.remove(); //then remove the draggedFlowerbed
  };
};

//game logic functions

let gameOver = false; //creating a variable to store the game over status
let playerTurn; //creating a variable to store the player's turn

// function to start the game
function startGame() { 
  if (playerTurn === undefined) { //if the playerTurn is undefined
    if (optionContainer.children.length != 0) { //if the optionContainer children length is not equal to 0
      infoDisplay.textContent = //then display the message below in the info Display
        "Please place all of your flowerbeds before starting the game!"; 
    } else {
      const allBoardBlocks = document.querySelectorAll("#computer div.block"); //selecting all of the computer's blocks
      allBoardBlocks.forEach((block) => //iterating over the allBoardBlocks array 
        block.addEventListener("click", handleClick) //adding an event listener to each block, which will call the handleClick function
      );
      playerTurn = true; //setting the playerTurn to true
      turnDisplay.textContent = "Your Turn"; //displaying the message Your Turn in the turnDisplay
      infoDisplay.textContent = "The game has begun!";
    };
  };
};
startButton.addEventListener("click", startGame);

let playerWateredFlower = []; //creating a variable to store the player's watered flower (singular)
let computerWateredFlower = []; //creating a variable to store the computer's watered flower (singular)
const playerWateredFlowerbed = []; //creating a variable to store the player's watered flowerbed (and therefore a hit)
const computerWateredFlowerbed = []; //creating a variable to store the computer's watered flowerbed (and therefore a hit)

// a function to determine if the player has watered a flowerbed
function handleClick(e, flowerbeds) { //function to handle the click
  if (!gameOver) { //if the game is not over
    if (e.target.classList.contains("taken")) { //if the block is taken
      e.target.classList.add("watered"); //then add the class name of watered to the block
      infoDisplay.textContent = `You watered the Computers flower!`; //display the message below in the infoDisplay
      let classes = Array.from(e.target.classList); //creating an array to store the classes of the block
      // filtering the classes to remove the block, watered and taken classes, so that we only pick out the flowerbed class and can tell which have been watered/hit
      classes = classes.filter((className) => className !== "block");
      classes = classes.filter((className) => className !== "watered");
      classes = classes.filter((className) => className !== "taken");
      playerWateredFlower.push(...classes); //pushing the classes to the playerWateredFlower array
      scoreCount("player", playerWateredFlower, playerWateredFlowerbed); //calling the scoreCount function and passing the player, playerWateredFlower and playerWateredFlowerbed
    }
    if (!e.target.classList.contains("taken")) { //
      //if the block is not taken, then the player has missed
      infoDisplay.textContent = "No flowerbeds were watered this time!";
      e.target.classList.add("empty");
    }
    playerTurn = false; //setting the playerTurn to false
    const allBoardBlocks = document.querySelectorAll("#computer div.block"); //selecting all of the computer's blocks
    allBoardBlocks.forEach((block) => block.replaceWith(block.cloneNode(true))); //iterating over the allBoardBlocks array and replacing each block with a clone of itself
    setTimeout(computerTurn, 1000); //calling the computerTurn function after 1 second
  };
};

// Controls the computer's turn
function computerTurn() {
  if (!gameOver) { //if the game is not over
    turnDisplay.textContent = "Computers Turn";
    infoDisplay.textContent = "The Computer is thinking...";

    setTimeout(() => { //setting a timeout to run the code after 1 second
      let randomTurn = Math.floor(Math.random() * 100); //creating a random turn based on the total size of the game board
      const allBoardBlocks = document.querySelectorAll("#player div.block"); //selecting all of the player's blocks

      if ( //if the randomTurn is taken and watered
        allBoardBlocks[randomTurn].classList.contains("taken") &&
        allBoardBlocks[randomTurn].classList.contains("watered")
      ) {
        computerTurn(); //then call the computerTurn function and
        return;
      } else if ( 
        allBoardBlocks[randomTurn].classList.contains("taken") && //if the randomTurn is taken and not watered
        !allBoardBlocks[randomTurn].classList.contains("watered") 
      ) {
        allBoardBlocks[randomTurn].classList.add("watered"); //then add the class name of watered to the block
        infoDisplay.textContent = `The Computer watered your flower!`;
        let classes = Array.from(allBoardBlocks[randomTurn].classList);
        // filtering the classes to remove the block, watered and taken classes, so that we only pick out the flowerbed class and can tell which have been watered/hit
        classes = classes.filter((className) => className !== "block");
        classes = classes.filter((className) => className !== "watered");
        classes = classes.filter((className) => className !== "taken");
        computerWateredFlower.push(...classes);
        scoreCount("computer", computerWateredFlower, computerWateredFlowerbed);
      } else {
        infoDisplay.textContent = "No flowers were watered this time!";
        allBoardBlocks[randomTurn].classList.add("empty");
      }
    }, 1000); 

    setTimeout(() => { //setting a timeout to run the code after 3seconds
      playerTurn = true; //setting the playerTurn to true
      turnDisplay.textContent = "Your Turn";
      infoDisplay.textContent = "Please take your turn!";
      const allBoardBlocks = document.querySelectorAll("#computer div.block");
      allBoardBlocks.forEach((block) =>
        block.addEventListener("click", handleClick)
      );
    }, 3000);
  }
}

// function to determine the winner
function scoreCount(user, userWateredFlower, userWateredFlowerbeds) { //function to count the score
  function checkFlowerbed(flowerbedName, flowerbedLength) { //function to check the flowerbed
    if ( //if the userWateredFlower is equal to the flowerbedLength
      userWateredFlower.filter(
        (storedFlowerbedName) => storedFlowerbedName === flowerbedName
      ).length === flowerbedLength // then the user has watered the flowerbed
    ) {
      
      if (user === "player") { //if the user is the player
        infoDisplay.textContent = `You have watered the computers ${flowerbedName}!`; //then display the message below in the infoDisplay
        playerWateredFlower = userWateredFlower.filter(   //and set the playerWateredFlower to the userWateredFlower
          (storedFlowerbedName) => storedFlowerbedName !== flowerbedName //and filter the storedFlowerbedName to remove the flowerbedName
        );
      }
      if (user === "computer") { //if the user is the computer
        infoDisplay.textContent = `The computer has watered your ${flowerbedName}!`; //then display the message below in the infoDisplay
        computerWateredFlower = userWateredFlower.filter( //and set the computerWateredFlower to the userWateredFlower
          (storedFlowerbedName) => storedFlowerbedName !== flowerbedName //and filter the storedFlowerbedName to remove the flowerbedName
        );
      };
      userWateredFlowerbeds.push(flowerbedName); //push the flowerbedName to the userWateredFlowerbeds
    };
  };

  checkFlowerbed("sunflower", 6);
  checkFlowerbed("tuilp", 5);
  checkFlowerbed("hibiscus", 4);
  checkFlowerbed("hyacinth", 3);
  checkFlowerbed("rose", 2);

  console.log("playerWateredFlower", playerWateredFlower);
  console.log("playerWateredFlowerbed", playerWateredFlowerbed);

  const wateredFlowerbedCount = userWateredFlowerbeds.length;

  hitsDisplay.textContent = `
    ${user === "player" ? "You have watered" : "The computer has watered" } 
    ${wateredFlowerbedCount}!
  `;

  if (playerWateredFlowerbed.length === 5) {
    infoDisplay.textContent =
      "Congratulations, you watered all the computers flowerbeds! You have won the game!";
    gameOver = true;
  }
  if (computerWateredFlowerbed.length === 5) {
    infoDisplay.textContent =
      "The computer has watered all your flowerbeds! You lost!";
    gameOver = true;
  };
};
