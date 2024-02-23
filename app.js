
const gamesBoardContainer = document.querySelector('#gamesboard-container')
const optionContainer = document.querySelector('.option-container')
const flipButton = document.querySelector('#flip-button')

let angle = 0 //global variable to start the flowerbed's angle as 0 
//a function for the flip button to rotate the flowerbeds
function flip () {
const optionFlowerBeds = Array.from(optionContainer.children)
    angle = angle === 0 ? 90 : 0 //if angle equals 0 return 90, else return 0
    optionFlowerBeds.forEach(optionFlowerBed => optionFlowerBed.style.transform = `rotate(${angle}deg)`) //css in javascript to rotate each flowerbed
}

// Creating the boards
const width = 10
function createBoard() {
    const gameBoardContainer = document.createElement('div') //creating a div using javascript for the singular gameboard
    gameBoardContainer.classList.add('game-board') // adding the class name of game-board to assign height and width in css
    gameBoardContainer.style.backgroundColor = 'green'

    gamesBoardContainer.append(gameBoardContainer)
}
createBoard()


flipButton.addEventListener('click', flip)