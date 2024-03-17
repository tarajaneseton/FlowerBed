const startButton = document.querySelector("#start-button");
const infoDisplay = document.querySelector("#info");
const turnDisplay = document.querySelector("#turn-display");
const optionContainer = document.querySelector(".option-container"); // change to player-container
const rotateButton = document.querySelector("#rotate-button");
import { createBoard } from "./boards.js";

//creating the boards using  the imported createBoard function
const playerBoard = createBoard("green", "player");
const computerBoard = createBoard("darkseagreen", "computer");

// A function to rotate the flowerbeds on button click
let angle = 0; // global variable to start the flowerbed's angle as 0
function rotate() {
  const optionFlowerbeds = Array.from(optionContainer.children); // places the player's flowerbeds into an array
  angle = angle === 0 ? 90 : 0; //checks if the angle is 0, if it is then it sets the angle to 90, if not then it sets the angle to 0
  optionFlowerbeds.forEach(
    (optionFlowerbed) =>
      (optionFlowerbed.style.transform = `rotate(${angle}deg)`)
  );
}
rotateButton.addEventListener("click", rotate);

// Creating the Flowerbeds
class Flowerbed {
  constructor(name, length) {
    this.name = name;
    this.length = length;
  }
}

const sunflower = new Flowerbed("sunflower", 6);
const tulip = new Flowerbed("tulip", 5);
const hibiscus = new Flowerbed("hibiscus", 4);
const hyacinth = new Flowerbed("hyacinth", 3);
const rose = new Flowerbed("rose", 2);

const flowerbeds = [sunflower, tulip, hibiscus, hyacinth, rose];
let notDropped;

// function to create flowerbeds based on the config file
function createFlowerbeds(user, flowerbeds) {
  const gameBoardContainer = document.getElementById(user); //selects the game board container based on the user

  if (!gameBoardContainer) {
    // if the game board container is not found, then log an error message
    console.error(`Game board container not found for user $(user)`);
    return;
  }

  // Creating the flowerbeds
  for (let flowerbed in flowerbeds) {
    //iterates over the flowerbeds
    for (let i = 0; i < flowerbeds[flowerbed]; i++) {
      // iterates over the flowerbeds and creates the flowerbeds based on the size
      const block = document.createElement("div"); //creates a div element for the flowerbed
      block.classList.add("flowerbed"); //adds the class name of flowerbed to the block
      //
      const coordinates = `${flowerbed}${i + 1}`; //creates the coordinates for the flowerbed
      block.dataset.coordinates = coordinates; // assigns the coordinates to the block
      block.textContent = coordinates; // adds the coordinates to the block

      // block.dataset.coordinates = `${flowerbed}${i + 1}`;
      gameBoardContainer.append(block); //appends the block to the game board container
    }
  }
}

//  function to add flowerbeds to the computer/neighbour board

function addFlowerbedPiece(user, flowerbeds, Flowerbed, startId) {
//   Check if flowerbeds is defined
//    if (!flowerbeds || !Array.isArray(flowerbeds)) {
//       console.error('Error: flowerbeds array is undefined or not an array');
//       return; // Exit the function early to prevent further execution
//   }
  const allBoardBlocks = document.querySelectorAll(`#${user} div.block`); // selecting all of the neighbour's blocks
  let randomBoolean = Math.random() < 0.5; // produces a random boolean value
  let isHorizontal = user === "player" ? angle === 0 : randomBoolean; // assigns the random boolean value to isHorizontal, which will be used to determine the orientation of the flowerbed
  let randomStartIndex = Math.floor(Math.random() * 100); // produce a random number between 1-100 to start

  let startIndex = startId ? startId : randomStartIndex; // if the startId is defined, then use the startId, if not then use the randomStartIndex

  // let validStart = isHorizontal ? startIndex <= 100 - flowerbeds.length ? startIndex :
  // 100 - flowerbeds.length :
  // startIndex <= 100 - 10 * flowerbeds.length ? startIndex :
  // startIndex - flowerbeds.length * 10 + 10
  // let validStart = isHorizontal ? startIndex <= 100 - flowerbeds.length ? startIndex : //determine if its a valid horizontal start by deducting the size of the flowerbed from the width of the board
  // 100 - flowerbeds.length :

  // // handle vertical - this doesnt work right now, vertical is going off the board....
  // startIndex <= 100 - 10 * flowerbeds.length ? startIndex : // if its true, i.e. smaller than 100 - 10 multiplied by the size of the flowerbed then its valid so return the randomstartindex
  // startIndex - flowerbeds.length * 10 + 10 //   if not, then deduct the size of the flowerbed and multiply by the size of the board

  let validStart;
  if (isHorizontal) {
    // If isHorizontal is true
    if (startIndex <= 100 - flowerbeds.length) {
      validStart = startIndex;
    } else {
      validStart = 100 - flowerbeds.length;
    }
  } else {
    // If isHorizontal is false
    if (startIndex <= 100 - 10 * flowerbeds.length) {
      validStart = startIndex;
    } else {
      validStart = startIndex - flowerbeds.length * 10 + 10;
    }
    console.log(flowerbeds);

  }

  let flowerbedBlocks = [];

  for (let i = 0; i < flowerbeds.length; i++) {
    //
    if (isHorizontal) {
      //if isHorizontal is true, figure out which indexes we want to colour with sunflowers
      flowerbedBlocks.push(allBoardBlocks[Number(validStart) + i]); //if the randomStartIndex is 5, then the first block will be 5, 6 and so on based on flowerbed.size
    } else {
      //if vertical
      flowerbedBlocks.push(allBoardBlocks[Number(validStart) + i * 10]); //if the randomStartIndex is 5, then the first block will be 5, 15 and so on based on flowerbed.size
    }
  }
  let valid;

  if (isHorizontal) {
    //further validation to prevent flowerbeds splitting and overlapping off the board
    flowerbedBlocks.every(
      (_flowerbedBlock, index) =>
        (valid =
          flowerbedBlocks[0].id % 10 !==
          10 - (flowerbedBlocks.length - (index + 1)))
    ); //if horizontal is true, use every method to check each flower bed block in a loop
    // take the first flowerbed block where modulus should not equal the size of  the flowerbed blocks minus the index plus 1
  } else {
    // if vertical
    flowerbedBlocks.every((_flowerbedBlock, index) => {
      const rowIndex = Math.floor(validStart / 10) + index;
      const columnIndex = validStart % 10;
      const row = rowIndex + 1;
      // console.log(`Index: ${index}, Row: ${row}, Column: ${columnIndex + 1}`);

      valid = flowerbedBlocks[0].id < 90 + (10 * index + 1);
    });
  }

  //A loop that keeps running to ensure that the placement of a flowerbed block is not placed on a 'taken'. It keeps running until the flowerbed is placed correctly on a not taken block.
  const notTaken = flowerbedBlocks.every(
    (flowerbedBlock) => !flowerbedBlock.classList.contains("taken")
  ); // cuse every method to check if every flowerbed contains the class taken, then we know its 'not taken'

  if (valid && notTaken) {
    //if the valid variable above is valid, and the blocks are not taken then the flowerbed has been placed correctly and we can add the class name of taken to the flowerbedBlocks
    flowerbedBlocks.forEach((flowerbedBlock) => {
      //iterates over the flowerbedBlocks and adds the name of the flowerbed to the flowerbedBlocks
      flowerbedBlock.classList.add(flowerbeds.name); //adds the name of the flowerbed to the flowerbedBlocks
      flowerbedBlock.classList.add("taken"); //
    });
  } else {
    if (user === "computer") addFlowerbedPiece(user, Flowerbed, startId); //if the flowerbed is not valid, then we call the function again to try and place the flowerbed in a different position
    if (user === "player") notDropped = true; //if the flowerbed is not valid, then we set the notDropped variable to true
  }
}
console.log(flowerbeds);
flowerbeds.forEach((Flowerbed) => addFlowerbedPiece("computer", Flowerbed)); //iterates over each Flowerbed object in the flowerbeds array and passes it to the addFlowerbedPiece function, adding it to the board

// Placing the flowerbeds on the player board

let draggedFlowerbed; // creating a variable to store the dragged flowerbed

const optionFlowerbeds = Array.from(optionContainer.children); //taking the flowerbeds that are in the option container and placing them in an array
optionFlowerbeds.forEach((optionFlowerbed) =>
  optionFlowerbed.addEventListener("dragstart", dragStart)
); //iterating over the optionFlowerbeds array and adding an event listener to each option, which will call the dragStart function

const playerBlocks = document.querySelectorAll("#player div"); //selecting all of player one's blocks
playerBlocks.forEach((playerBlock) => {
  playerBlock.addEventListener("dragover", dragOver);
  playerBlock.addEventListener("drop", dropFlowerbed);
}); //iterating over the playerBlocks array and adding an event listener to each block, which will call the dragOver function

function dragStart(e) {
  //function to start the drag
  notDropped = false;
  draggedFlowerbed = e.target; //assigning the target of the event to the draggedFlowerbed variable
  console.log(e.target);
}

function dragOver(e) {
  //function to drag over the flowerbed
  e.preventDefault(); //preventing the default action of the event
  const flowerbed = flowerbeds[draggedFlowerbed.id]; //assigning the flowerbeds to the draggedFlowerbed id
}

function dropFlowerbed(e) {
  const startId = e.target.id;
  const flowerbed = flowerbeds[draggedFlowerbed.id];
  addFlowerbedPiece("player", flowerbed, startId);
  if (!notDropped) {
    draggedFlowerbed.remove();
  }
}

//game logic functions

let gameOver = false;
let playerTurn;

//Start the game
function startGame() {
  if (playerTurn === undefined) {
    if (optionContainer.children.length != 0) {
      infoDisplay.textContent =
        "Please place all of your flowerbeds before starting the game!";
    } else {
      const allBoardBlocks = document.querySelectorAll("#computer div.block");
      allBoardBlocks.forEach((block) =>
        block.addEventListener("click", handleClick)
      );
      playerTurn = true;
      turnDisplay.textContent = "Your Turn";
      infoDisplay.textContent = "The game has begun!";
    }
  }
}
startButton.addEventListener("click", startGame);

let playerWateredFlower = [];
let computerWateredFlower = [];
const playerWateredFlowerbed = [];
const computerWateredFlowerbed = [];

// a function to determine if the player has watered a flowerbed
function handleClick(e) {
  if (!gameOver) {
    if (e.target.classList.contains("taken")) {
      e.target.classList.add("watered");
      infoDisplay.textContent = `You watered the Computers ${flowerbedName} flower!`;
      let classes = Array.from(e.target.classList);
      // filtering the classes to remove the block, watered and taken classes, so that we only pick out the flowerbed class and can tell which have been watered/hit
      classes = classes.filter((className) => className !== "block");
      classes = classes.filter((className) => className !== "watered");
      classes = classes.filter((className) => className !== "taken");
      playerWateredFlower.push(...classes);
      scoreCount("player", playerWateredFlower, playerWateredFlowerbed);
    }
    if (!e.target.classList.contains("taken")) {
      //if the block is not taken, then the player has missed
      infoDisplay.textContent = "No flowerbeds were watered this time!";
      e.target.classList.add("empty");
    }
    playerTurn = false;
    const allBoardBlocks = document.querySelectorAll("#computer div.block");
    allBoardBlocks.forEach((block) => block.replaceWith(block.cloneNode(true)));
    // allBoardBlocks.forEach(block => block.removeEventListener('click', handleClick))
    setTimeout(computerTurn, 3000);
  }
}

// Controls the computer's turn
function computerTurn() {
  if (!gameOver) {
    turnDisplay.textContent = "Computers Turn";
    infoDisplay.textContent = "The Computer is thinking...";

    setTimeout(() => {
      let randomTurn = Math.floor(Math.random() * 100);
      const allBoardBlocks = document.querySelectorAll("#player div.block");

      if (
        allBoardBlocks[randomTurn].classList.contains("taken") &&
        allBoardBlocks[randomTurn].classList.contains("watered")
      ) {
        computerTurn();
        return;
      } else if (
        allBoardBlocks[randomTurn].classList.contains("taken") &&
        !allBoardBlocks[randomTurn].classList.contains("watered")
      ) {
        allBoardBlocks[randomTurn].classList.add("watered");
        infoDisplay.textContent = `The Computer watered your ${flowerbedName} flower!`;
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
    }, 3000);

    setTimeout(() => {
      playerTurn = true;
      turnDisplay.textContent = "Your Turn";
      infoDisplay.textContent = "Please take your turn!";
      const allBoardBlocks = document.querySelectorAll("#computer div.block");
      allBoardBlocks.forEach((block) =>
        block.addEventListener("click", handleClick)
      );
    }, 6000);
  }
}

// function to determine the winner
function scoreCount(user, userWateredFlower, userWateredFlowerbeds) {
  function checkFlowerbed(flowerbedName, flowerbedLength) {
    if (
      userWateredFlower.filter(
        (storedFlowerbedName) => storedFlowerbedName === flowerbedName
      ).length === flowerbedLength
    ) {
      if (user === "player") {
        infoDisplay.textContent = `You have watered the computers ${flowerbedName}!`;
        playerWateredFlower = userWateredFlower.filter(
          (storedFlowerbedName) => storedFlowerbedName !== flowerbedName
        );
      }
      if (user === "computer") {
        infoDisplay.textContent = `The computer has watered your ${flowerbedName}!`;
        computerWateredFlower = userWateredFlower.filter(
          (storedFlowerbedName) => storedFlowerbedName !== flowerbedName
        );
      }
      userWateredFlowerbeds.push(flowerbedName);
    }
  }

  checkFlowerbed("sunflower", 6);
  checkFlowerbed("tuilp", 5);
  checkFlowerbed("hibiscus", 4);
  checkFlowerbed("hyacinth", 3);
  checkFlowerbed("rose", 2);

  console.log("playerWateredFlower", playerWateredFlower);
  console.log("playerWateredFlowerbed", playerWateredFlowerbed);

  if (playerWateredFlowerbed.length === 5) {
    infoDisplay.textContent =
      "Congratulations, you watered all the computers flowerbeds! You have won the game!";
    gameOver = true;
  }
  if (computerWateredFlowerbed.length === 5) {
    infoDisplay.textContent =
      "The computer has watered all your flowerbeds! You lost!";
    gameOver = true;
  }
}
