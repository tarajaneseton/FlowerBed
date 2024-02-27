// const fs = require('fs');
// const ini = require('ini');
// const playerboard = require('playerBoard-js');

// const flowerbed = 'sunflower,5';

// const flowerbed_config = ini.parse(fs.readFileSync('./flowerbed_config.ini', 'utf-8'));
// const Board = flowerbed_config.Board;
// console.log(Board);

// playerboard(Board, flowerbed)
//     .then(result => console.log(result))
//     .catch(error => console.log(error));

// const gamesBoardContainer = document.querySelector('#gamesboard-container')
// const optionContainer = document.querySelector('.option-container')
// const flipButton = document.querySelector('#flip-button')


// let angle = 0 //global variable to start the flowerbed's angle as 0 
// //a function for the flip button to rotate the flowerbeds
// function flip () {
// const optionFlowerBeds = Array.from(optionContainer.children)
//     angle = angle === 0 ? 90 : 0 //if angle equals 0 return 90, else return 0
//     optionFlowerBeds.forEach(optionFlowerBed => optionFlowerBed.style.transform = `rotate(${angle}deg)`) //css in javascript to rotate each flowerbed
// }

// Creating the boards
// const width = 10

// function createBoard(color, user) {
//     const gameBoardContainer = document.createElement('div') //creating a div using javascript for the singular gameboard
//     gameBoardContainer.classList.add('game-board') // adding the class name of game-board to assign height and width in css
//     gameBoardContainer.style.backgroundColor = color
//     gameBoardContainer.id = user


//     for (let i = 0; i < width * width; i++ ) { // a loop to create the blocks that make up the board. 
//         const block = document.createElement('div') // the loop creates a div element
//         block.classList.add('block') // gives it a class name of block
//         block.id = i //assigns an id of i to each block 
//         gameBoardContainer.append(block) //append each block to the gamesboard container, this will happen 100 times
//     } // need to update this to work with coordinates
//     gamesBoardContainer.append(gameBoardContainer)
// }
// createBoard('green', 'player')
// createBoard('lime', 'computer')


// flipButton.addEventListener('click', flip)