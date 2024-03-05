const gamesBoardContainer = document.querySelector('#gamesboard-container')
const optionContainer = document.querySelector('.option-container')
const rotateButton = document.querySelector('#rotate-button')

//A function handles the rotation of the flowerbeds on button click
// let angle = 0 //global variable to start the flowerbed's angle as 0 

// optionContainer.addEventListener('click', rotate);

// function rotate(event) {
//     const clickedElement = event.target;

//     // Check if the clicked element is a flowerbed
//     if (clickedElement.classList.contains('flowerbed')) {
//         const originalCoordinates = clickedElement.dataset.coordinates;

//         if (originalCoordinates) {
//             const [column, row] = originalCoordinates.split('');

//             const rotatedCoordinates = angle === 90
//                 ? `${String.fromCharCode(column.charCodeAt(0) + parseInt(row, 10))}${11 - parseInt(column, 36)}`
//                 : `${String.fromCharCode(65 + parseInt(row, 10))}${parseInt(column, 36)}`;

//             clickedElement.style.transform = `rotate(${angle}deg)`;
//             clickedElement.dataset.coordinates = rotatedCoordinates;
//         } else {
//             console.error('Dataset coordinates not found for clicked flowerbed:', clickedElement);
//         }
//     }
// }
// function rotate() {
//     const optionFlowerBeds = Array.from(optionContainer.children);
//     angle = angle === 0 ? 90 : 0;

//     optionFlowerBeds.forEach((optionFlowerBed) => {
//         const originalCoordinates = optionFlowerBed.dataset.coordinates; // takes the original coordinates and updates them based on rotation

//         let column, row;
//         if (originalCoordinates) {
//             console.log('Original coordinates:', originalCoordinates);
//             [column, row] = originalCoordinates.split('');
//             console.log('Column:', column, 'Row:', row);

//         } else {
//             console.error('Dataset coordinates not found for optionFlowerBed:', optionFlowerBed);
//             return;
//         }

//         const rotatedCoordinates =
//             angle === 90
//                 ? `${String.fromCharCode(column.charCodeAt(0) + parseInt(row, 10))}${11 - parseInt(column, 36)}`
//                 : `${String.fromCharCode(65 + parseInt(row, 10))}${parseInt(column, 36)}`;

//                 console.log('Rotated Coordinates:', rotatedCoordinates);


//         optionFlowerBed.style.transform = `rotate(${angle}deg)`;
//         optionFlowerBed.dataset.coordinates = rotatedCoordinates;
//     });
// }



// Function to read and load game configuration from flowerbed_config.ini file using Fetch API
async function loadConfiguration() {
    const configFilePath = './flowerbed_config.ini';

    try {
        const response = await fetch(configFilePath);
        if (!response.ok) {
            throw new Error('Failed to load configuration from ${configFilePath}');
        }
        return await response.text();
    } catch (error) {
        console.error(error.message);
        return null;

    }
}

// Creating the boards

//function to initialises the game by creating the garden and neighbour boards and places flowerbeds based on the config file
async function initialiseGame() {
    const flowerbedConfig = await loadConfiguration();

    if (!flowerbedConfig) {
        createFlowerbeds('garden', 'flowerbedConfig');
        createFlowerbeds('neighbour', 'flowerbedConfig');
    }
}

// Calling the initilise game function
initialiseGame();

// Function to create a board with columns, rows and blocks with coordinates based on the config file
function createBoard(color, user) {
    const gameBoardContainer = document.createElement('div') //creating a div using javascript for the singular gameboard
    gameBoardContainer.classList.add('game-board') // adding the class name of game-board to assign height and width in css
    gameBoardContainer.style.backgroundColor = color
    gameBoardContainer.id = user

    
    // Creating row labels 1-10
    const labelsRow = document.createElement('div');
    labelsRow.classList.add('labels-row');
    for (let i = 1; i <= 10; i++) { //creates row labels 1-10
        const label = document.createElement('div'); 
        label.classList.add('label'); // adding a label class to create the row labels 1-10
        label.textContent = i;
        labelsRow.appendChild(label);
    }
    gameBoardContainer.appendChild(labelsRow);

   // a loop to create the columns and blocks
    for (let i = 0; i < 10; i++) { 
        const row = document.createElement('div');
        row.classList.add('row');

        // Labelling the columns A-J
        const columnLabel = document.createElement('div');
        columnLabel.classList.add('label');
        // rowLabel.textContent = i;
        columnLabel.textContent = String.fromCharCode(65 + i);
        row.appendChild(columnLabel);

        //creating the blocks
        for (let j = 0; j < 10; j++) {
            const block = document.createElement('div');
            block.classList.add('block');
    
                block.dataset.coordinates = `${String.fromCharCode(65 + i)}${j + 1}`;
            row.appendChild(block);
        }

        gameBoardContainer.appendChild(row);
    }

    gamesBoardContainer.append(gameBoardContainer);

    return gameBoardContainer;
}

const gardenBoard = createBoard('green', 'garden');
const neighbourBoard = createBoard('darkseagreen', 'neighbour');

// Function to read and place flowerbeds
function createFlowerbeds(user, flowerbedConfig) {
    const gameBoardContainer = document.getElementById(user);

    if(!gameBoardContainer) {
        console.error(`Game board container not found for user $(user)`);
        return;
    }

    // const flowerbeds = {}; // initialising an empty object to store the flowerbeds from the config file
    
    //a variable that splits the config file into lines and iterates over them
    const lines = flowerbedConfig.split('\n');
    lines.forEach((line, index) => {
        const [type, name, size] = line.trim().split(' '); //Destructing. extracting values from config file and splitting them

        if (type === 'Flowerbed') {
            // flowerbeds[name] = parseInt(size, 10);
            const flowerbedSize = parseInt(size, 10);

            if (isNaN(flowerbedSize)) {
                console.error(`Invalid flowerbed size found on line ${index + 1}`);
                return;
            }

            flowerbeds[name] = flowerbedSize;
        }
    });

    for (let flowerbed in flowerbeds) {
        for (let i = 0; i < flowerbeds[flowerbed]; i++) {
            const block = document.createElement('div');
            block.classList.add('flowerbed');
            //
            const coordinates = `${flowerbed}${i + 1}`;
            block.dataset.coordinates = coordinates; // this line displays coordinates. if the rotate button works correctly, this can be deleted.
            block.textContent = coordinates;

            // block.dataset.coordinates = `${flowerbed}${i + 1}`;
            gameBoardContainer.append(block);
        }
    }
    }

    // Creating Flowerbeds
    class Flowerbed {
        constructor(name, size) {
            this.name = name;
            this.size = size;
        }
    }
    
    const sunflower = new Flowerbed('sunflower', 6)
    const tulip = new Flowerbed('tulip', 5)
    const hibiscus = new Flowerbed('hibiscus', 4)
    const hyacinth = new Flowerbed('hyacinth', 3)
    const rose = new Flowerbed('rose', 2)
    const width = 10
const height = 10
 
const flowerbeds = [sunflower, tulip, hibiscus, hyacinth, rose]
 
//  function to add flowerbeds to the computer/neighbour board
function addFlowerbedPiece(flowerbed) {
    const allBoardBlocks = document.querySelectorAll('#neighbour div.block') // selecting all of the neighbour's blocks
    let randomBoolean = Math.random() < 0.5 // produces a random boolean value
    let isHorizontal = randomBoolean // assigns the random boolean value to isHorizontal, which will be used to determine the orientation of the flowerbed
    let randomStartIndex = Math.floor(Math.random() * width * width ) // produce a random number between 1-100 to start

    let validStart = isHorizontal ? randomStartIndex <= width * width - flowerbed.size ? randomStartIndex : //determine if its a valid horizontal start by deducting the size of the ship from the width of the board
    width * width - flowerbed.size :
    // handle vertical
    randomStartIndex <= width * width - width * flowerbed.size ? randomStartIndex : 
        randomStartIndex - flowerbed.size * width + width // if its true, i.e. smaller than 100 - 10 multiplied by the size of the flowerbed  then its valid so return the randomstartindex

    let flowerbedBlocks = []
 
    for (let i = 0; i < flowerbed.size; i++) { //
        if (isHorizontal) { //if isHorizontal is true, figure out which indexes we want to colour with sunflowers
            flowerbedBlocks.push(allBoardBlocks[Number(validStart) + i]) //if the randomStartIndex is 5, then the first block will be 5, 6 and so on based on flowerbed.size
        } else { //if vertical
            flowerbedBlocks.push(allBoardBlocks[Number(randomStartIndex) + i * width]) //if the randomStartIndex is 5, then the first block will be 5, 15 and so on based on flowerbed.size
        }
    }
    // place the flowerbed on the board
    flowerbedBlocks.forEach(flowerbedBlocks => { //iterates over the flowerbedBlocks and adds the name of the flowerbed to the flowerbedBlocks
        flowerbedBlocks.classList.add(flowerbed.name) //adds the name of the flowerbed to the flowerbedBlocks
        flowerbedBlocks.classList.add('watered') //adds the class of watered to the flowerbedBlocks
    })
}

flowerbeds.forEach(flowerbed => addFlowerbedPiece(flowerbed)) //iterates over the flowerbeds array and adds the flowerbeds to the neighbour board    