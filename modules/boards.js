const gamesBoardContainer = document.querySelector('#gamesboard-container')
const optionContainer = document.querySelector('.option-container')

// Function to create a board with columns, rows and blocks with coordinates based on the config file
export function createBoard(color, user) {
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