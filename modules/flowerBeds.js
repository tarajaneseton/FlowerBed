import { createBoard } from './boards.js';
// Purpose: To create flowerbeds based on the config file 
 // Creating Flowerbeds
export default class Flowerbed {
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
 
export const flowerbeds = [sunflower, tulip, hibiscus, hyacinth, rose]

// function to create flowerbeds based on the config file
export function createFlowerbeds(user, flowerbedConfig) { 
    const gameBoardContainer = document.getElementById(user); //selects the game board container based on the user

    if(!gameBoardContainer) { // if the game board container is not found, then log an error message
        console.error(`Game board container not found for user $(user)`);
        return;
    }
    
    const lines = flowerbedConfig.split('\n'); //splits the config file into lines
    lines.forEach((line, index) => { // iterates over the lines
        const [type, name, size] = line.trim().split(' '); //splits the line into type, name and size e.g. Flowerbed sunflower 6

        if (type === 'Flowerbed') { //if the type is flowerbed, then create a flowerbed
            const flowerbedSize = parseInt(size, 10); //parses the size of the flowerbed into an integer

            if (isNaN(flowerbedSize)) { //if the flowerbed size is not a number, then log an error message
                console.error(`Invalid flowerbed size found on line ${index + 1}`);
                return;
            }

            flowerbeds[name] = flowerbedSize; //assigns the flowerbed name and size to the flowerbeds object
            console.log(flowerbeds)
        }
    });

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

