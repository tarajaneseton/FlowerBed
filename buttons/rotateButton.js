export const rotateButton = document.querySelector('#rotate-button')
const optionContainer = document.querySelector('.option-container')

// A function handles the rotation of the flowerbeds on button click
export var angle = 0 //global variable to start the flowerbed's angle as 0 

optionContainer.addEventListener('click', rotate);

export function rotate(event) {
    const clickedElement = event.target;

    // Check if the clicked element is a flowerbed
    if (clickedElement.classList.contains('flowerbed')) {
        const originalCoordinates = clickedElement.dataset.coordinates;

        if (originalCoordinates) {
            const [column, row] = originalCoordinates.split('');

            const rotatedCoordinates = angle === 90
                ? `${String.fromCharCode(column.charCodeAt(0) + parseInt(row, 10))}${11 - parseInt(column, 36)}`
                : `${String.fromCharCode(65 + parseInt(row, 10))}${parseInt(column, 36)}`;

            clickedElement.style.transform = `rotate(${angle}deg)`;
            clickedElement.dataset.coordinates = rotatedCoordinates;
        } else {
            console.error('Dataset coordinates not found for clicked flowerbed:', clickedElement);
        }
    }
}