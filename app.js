import { createBoard } from './modules/boards.js';
import { angle, rotate, rotateButton } from './buttons/rotateButton.js';
const optionContainer = document.querySelector('.option-container')

const playerBoard = createBoard('green', 'player');
const computerBoard = createBoard('darkseagreen', 'computer');

 // Creating Flowerbeds
 export default class Flowerbed {
    constructor(name, length) {
        this.name = name;
        this.length = length;
    }
}

const sunflower = new Flowerbed('sunflower', 6)
const tulip = new Flowerbed('tulip', 5)
const hibiscus = new Flowerbed('hibiscus', 4)
const hyacinth = new Flowerbed('hyacinth', 3)
const rose = new Flowerbed('rose', 2)

export const flowerbeds = [sunflower, tulip, hibiscus, hyacinth, rose]
let notDropped




//  function to add flowerbeds to the computer/neighbour board


function addFlowerbedPiece(user, flowerbeds, Flowerbed, startId) {
    console.log("flowerbeds:", flowerbeds);

    const allBoardBlocks = document.querySelectorAll(`#${user} div.block`) // selecting all of the neighbour's blocks
    let randomBoolean = Math.random() < 0.5 // produces a random boolean value
    let isHorizontal = user === 'player' ? angle === 0 : randomBoolean // assigns the random boolean value to isHorizontal, which will be used to determine the orientation of the flowerbed
    let randomStartIndex = Math.floor(Math.random() * 100 ) // produce a random number between 1-100 to start
    
    let startIndex = startId ? startId : randomStartIndex
    let validStart = isHorizontal ? startIndex <= 100 - flowerbeds.length ? startIndex : //determine if its a valid horizontal start by deducting the size of the flowerbed from the width of the board
    100 - flowerbeds.length :
    
    // handle vertical - this doesnt work right now, vertical is going off the board....
    startIndex <= 100 - 10 * flowerbeds.length ? startIndex : // if its true, i.e. smaller than 100 - 10 multiplied by the size of the flowerbed then its valid so return the randomstartindex
    startIndex - flowerbeds.length * 10 + 10 //   if not, then deduct the size of the flowerbed and multiply by the size of the board

    let flowerbedBlocks = []
 
    for (let i = 0; i < flowerbeds.length; i++) { //
        if (isHorizontal) { //if isHorizontal is true, figure out which indexes we want to colour with sunflowers
            flowerbedBlocks.push(allBoardBlocks[Number(validStart) + i]) //if the randomStartIndex is 5, then the first block will be 5, 6 and so on based on flowerbed.size
        } else { //if vertical
            flowerbedBlocks.push(allBoardBlocks[Number(validStart) + i * 10]) //if the randomStartIndex is 5, then the first block will be 5, 15 and so on based on flowerbed.size
        }
    }
    let valid 

    if (isHorizontal) { //further validation to prevent flowerbeds splitting and overlapping off the board
    flowerbedBlocks.every((_flowerbedBlock, index) => 
        valid = flowerbedBlocks[0].id % 10 !== 10 - (flowerbedBlocks.length - (index + 1))) //if horizontal is true, use every method to check each flower bed block in a loop
    // take the first flowerbed block where modulus should not equal the size of  the flowerbed blocks minus the index plus 1
} else { // if vertical
    flowerbedBlocks.every((_flowerbedBlock, index) => {
        const rowIndex = Math.floor(validStart / 10) + index;
        const columnIndex = validStart % 10;
        const row = rowIndex + 1;
        // console.log(`Index: ${index}, Row: ${row}, Column: ${columnIndex + 1}`);
        
    valid = flowerbedBlocks[0].id < 90 + (10 * index + 1)
});
}

//A loop that keeps running to ensure that the placement of a flowerbed block is not placed on a 'taken'. It keeps running until the flowerbed is placed correctly on a not taken block.
    const notTaken = flowerbedBlocks.every(flowerbedBlock => !flowerbedBlock.classList.contains('taken')) // cuse every method to check if every flowerbed contains the class taken, then we know its 'not taken'


    if (valid && notTaken) { //if the valid variable above is valid, and the blocks are not taken then the flowerbed has been placed correctly and we can add the class name of taken to the flowerbedBlocks
        flowerbedBlocks.forEach(flowerbedBlock => { //iterates over the flowerbedBlocks and adds the name of the flowerbed to the flowerbedBlocks
            flowerbedBlock.classList.add(flowerbeds.name) //adds the name of the flowerbed to the flowerbedBlocks
            flowerbedBlock.classList.add('taken') //
        })
    } else {
        if (user === 'computer') addFlowerbedPiece(Flowerbed) //if the flowerbed is not valid, then we call the function again to try and place the flowerbed in a different position
        if (user === 'player') notDropped = true; //if the flowerbed is not valid, then we set the notDropped variable to true
    }
    
}

flowerbeds.forEach(Flowerbed => addFlowerbedPiece('computer', Flowerbed)) //iterates over each Flowerbed object in the flowerbeds array and passes it to the addFlowerbedPiece function, adding it to the board


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
    if (!notDropped) {
        draggedShip.remove()
    }
}
