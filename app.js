const gamesBoardContainer = document.querySelector('#gamesboard-container')
const optionContainer = document.querySelector('.option-container')
const rotateButton = document.querySelector('#rotate-button')

//A function handles the rotation of the flowerbeds on button click
let angle = 0 //global variable to start the flowerbed's angle as 0 

function rotate() {
    const optionFlowerBeds = Array.from(optionContainer.children);
    angle = angle === 0 ? 90 : 0;

    optionFlowerBeds.forEach((optionFlowerBed) => {
        const originalCoordinates = optionFlowerBed.dataset.coordinates; // takes the original coordinates and updates them based on rotation
        if (originalCoordinates) {
            const [column, row] = originalCoordinates.split('');
        } else {
            console.error('Dataset coordinates not found for optionFlowerBed:', optionFlowerBed);
            return;
        }

        const rotatedCoordinates =
            angle === 90
                ? `${String.fromCharCode(column.charCodeAt(0) + parseInt(row, 10))}${11 - parseInt(column, 36)}`
                : `${String.fromCharCode(65 + parseInt(row, 10))}${parseInt(column, 36)}`;

        optionFlowerBed.style.transform = `rotate(${angle}deg)`;
        optionFlowerBed.dataset.coordinates = rotatedCoordinates;
    });
}

rotateButton.addEventListener('click', rotate);


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
        // const data = await response.text();
        // const config = parseConfig(data);
        // console}
    }
}

const gardenBoard = createBoard('green', 'garden');
const neighbourBoard = createBoard('lime', 'neighbour');

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

    // Creating the column labels and rows
    const labelsRow = document.createElement('div');
    labelsRow.classList.add('labels-row');
    for (let i = 0; i <= 10; i++) { //creates column labels A-J in the first row
        const label = document.createElement('div'); 
        label.classList.add('label'); // adding a label to create the column labels A-J
        label.textContent = i === 0 ? '' : String.fromCharCode(64 + i);
        labelsRow.appendChild(label);
    }
    gameBoardContainer.appendChild(labelsRow);

    // Row labels (1-10) and Blocks
    for (let i = 0; i < 10; i++) {
        const row = document.createElement('div');
        row.classList.add('row');

        // Row labels (1-10)
        const rowLabel = document.createElement('div');
        rowLabel.classList.add('label');
        rowLabel.textContent = i;
        row.appendChild(rowLabel);

        //nested within the second loop to create the blocks
        for (let j = 0; j <= 10; j++) {
            const block = document.createElement('div');
            block.classList.add('block');
            if (j ===0) {
                // Adding row labels 1-10
                block.textContent = i;
                block.classList.add('label');
            } else {
                block.dataset.coordinates = `${String.fromCharCode(65 + j)}${i + 1}`;
            }
            row.appendChild(block);
        }
        gameBoardContainer.appendChild(row);
    }

    // for (let i = 0; i < width * width; i++ ) { // a loop to create the blocks that make up the board. 
    //     const block = document.createElement('div') // the loop creates a div element
    //     block.classList.add('block') // gives it a class name of block
    //     block.id = i //assigns an id of i to each block 
    //     gameBoardContainer.append(block) //append each block to the gamesboard container, this will happen 100 times
    // } // need to update this to work with coordinates
    gamesBoardContainer.append(gameBoardContainer);

    return gameBoardContainer;
}
// createBoard('green', 'player')
// createBoard('lime', 'computer')

// Function to read and place flowerbeds
function createFlowerbeds(user, flowerbedConfig) {
    const gameBoardContainer = document.getElementById(user);

    if(!gameBoardContainer) {
        console.error(`Game board container not found for user $(user)`);
        return;
    }

    const flowerbeds = {}; // initialising an empty object to store the flowerbeds from the config file
    
    //a variable that splits the config file into lines and iterates over them
    const lines = flowerbedConfig.split('\n');
    lines.forEach(line => {
        const [type, name, size] = line.trim().split(' '); //Destructing. extracting values from config file and splitting them
        if (type === 'Flowerbed') {
            flowerbeds[name] = parseInt(size, 10);
        }
    });

    for (let flowerbed in flowerbeds) {
        for (let i = 0; i < flowerbeds[flowerbed]; i++) {
            const block = document.createElement('div');
            block.classList.add('flowerbed');
            block.dataset.coordinates = `${flowerbed}${i + 1}`;
            gameBoardContainer.append(block);
        }
    }
    }



