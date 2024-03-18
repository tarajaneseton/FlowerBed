const gamesBoardContainer = document.querySelector('#gamesboard-container')

// A function to create the game board 
export function createBoard(color, user) {
    const gameBoardContainer = document.createElement('div') // creating a div element to hold the game board
    gameBoardContainer.classList.add('game-board') // adding a class to the game board div
    gameBoardContainer.style.backgroundColor = color // setting the background color of the game board
    gameBoardContainer.id = user // setting the id of the game board to the user's name

    // creating the row labels 1-10
    const labelsRow = document.createElement('div'); // creating a div element to hold the row labels
    labelsRow.classList.add('labels-row'); // adding a class to the row labels div
    for (let i = 1; i <= 10; i++) { // a loop to create the row labels 1-10
        const label = document.createElement('div'); // creating a div element to hold the row labels
        label.classList.add('label'); // adding a class to the row label div
        label.textContent = i; // setting the text content of the row label div to the current value of i
        labelsRow.appendChild(label); // appending the row label div to the row labels div
    }
    gameBoardContainer.appendChild(labelsRow); // appending the row labels div to the game board div

   // a loop to create the columns and blocks
    for (let i = 0; i < 10; i++) {  // 
        const row = document.createElement('div');
        row.classList.add('row');

        // Labelling the columns A-J
        const columnLabel = document.createElement('div'); // creating a div element to hold the column labels
        columnLabel.classList.add('label'); // adding a class to the column label div
        columnLabel.textContent = String.fromCharCode(65 + i); 
        row.appendChild(columnLabel); // appending the column label div to the row div

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

