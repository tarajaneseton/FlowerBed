import Flowerbed, { flowerbeds, createFlowerbeds } from './flowerBeds.js'
const optionContainer = document.querySelector('.option-container')

// Placing the flowerbeds on the player board

let draggedFlowerbed // creating a variable to store the dragged flowerbed

const optionFlowerbeds = Array.from(optionContainer.children) //taking the flowerbeds that are in the option container and placing them in an array
optionFlowerbeds.forEach(optionFlowerbed => optionFlowerbed.addEventListener('dragstart', dragStart)) //iterating over the optionFlowerbeds array and adding an event listener to each optionShip, which will call the dragStart function

const playerBlocks = document.querySelectorAll('#player div') //selecting all of player one's blocks
playerBlocks.forEach(playerBlock => {
    playerBlock.addEventListener('dragover', dragOver)
    playerBlock.addEventListener('drop', dropFlowerbed)
}) //iterating over the playerBlocks array and adding an event listener to each block, which will call the dragOver function

function dragStart(e) { //function to start the drag
    draggedFlowerbed = e.target //assigning the target of the event to the draggedFlowerbed variable 
    console.log(e.target)
}

function dragOver(e) { //function to drag over the flowerbed
    e.preventDefault() //preventing the default action of the event
}

function dropFlowerbed(e) {
    const startId = e.target.id  
    const flowerbed = flowerbeds[draggedFlowerbed.id]
    addFlowerbedPiece('player', flowerbed, startId)
}

// // Placing the flowerbeds on the garden board

// let draggedFlowerbed // creating a variable to store the dragged flowerbed

// const gardenShedFlowerBeds = Array.from(gardenShedContainer.children) //taking the flowerbeds that are in the gardenShed container and placing them in an array
// gardenShedFlowerBeds.forEach(gardenShedFlowerBeds => gardenShedFlowerBed.addEventListener('dragstart', dragStart)) //iterating over the gardenShedFlowerbed array and adding an event listener to each optionShip, which will call the dragStart function

// const playerBlocks = document.querySelectorAll('#player div') //selecting all of player one's blocks
// playerBlocks.forEach(playerBlock => {
//     playerBlock.addEventListener('dragover', dragOver)
//     playerBlock.addEventListener('drop', dropFlowerbed)
// }) //iterating over the playerBlocks array and adding an event listener to each block, which will call the dragOver function

// function dragStart(e) { //function to start the drag
//     draggedFlowerbed = e.target //assigning the target of the event to the draggedFlowerbed variable 
// }

// function dragOver(e) { //function to drag over the flowerbed
//     e.preventDefault() //preventing the default action of the event
// }

// function dropFlowerbed(e) {
//     const startId = e.target.id  
//     const flowerbed = flowerbeds[draggedFlowerbed]
// }