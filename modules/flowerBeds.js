import { createBoard } from './boards.js';
import Flowerbed, { flowerbeds } from './app.js';
// Purpose: To create flowerbeds based on the config file 


// function to create flowerbeds based on the config file
function createFlowerbeds(user, flowerbedConfig) { 
    const gameBoardContainer = document.getElementById(user); //selects the game board container based on the user

    if(!gameBoardContainer) { // if the game board container is not found, then log an error message
        console.error(`Game board container not found for user $(user)`);
        return;
    }


    // Creating the flowerbeds
    for (let flowerbed in flowerbeds) { //iterates over the flowerbeds
        for (let i = 0; i < flowerbeds[flowerbed]; i++) { // iterates over the flowerbeds and creates the flowerbeds based on the size
            const block = document.createElement('div'); //creates a div element for the flowerbed
            block.classList.add('flowerbed'); //adds the class name of flowerbed to the block
            //
            const coordinates = `${flowerbed}${i + 1}`; //creates the coordinates for the flowerbed
            block.dataset.coordinates = coordinates; // assigns the coordinates to the block
            block.textContent = coordinates; // adds the coordinates to the block

            // block.dataset.coordinates = `${flowerbed}${i + 1}`;
            gameBoardContainer.append(block); //appends the block to the game board container
        }
    }
    }

