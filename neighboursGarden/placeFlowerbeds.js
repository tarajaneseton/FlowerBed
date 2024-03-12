// import { flowerbeds } from '../modules/flowerBeds.js'; //importing the Flowerbed class from the flowerBeds module


// let flowerbedBlocks = []

// //  function to add flowerbeds to the computer/neighbour board
// export function addFlowerbedPiece(flowerbed) {
//     const allBoardBlocks = document.querySelectorAll('#neighbour div.block') // selecting all of the neighbour's blocks
//     let randomBoolean = Math.random() < 0.5 // produces a random boolean value
//     let isHorizontal = randomBoolean // assigns the random boolean value to isHorizontal, which will be used to determine the orientation of the flowerbed
//     let randomStartIndex = Math.floor(Math.random() * 100 ) // produce a random number between 1-100 to start
    
//     let validStart = isHorizontal ? randomStartIndex <= 100 - flowerbed.size ? randomStartIndex : //determine if its a valid horizontal start by deducting the size of the flowerbed from the width of the board
//     100 - flowerbed.size :
//     // handle vertical - this doesnt work right now, vertical is going off the board....
//     randomStartIndex <= 100 - 10 * flowerbed.size ? randomStartIndex : // if its true, i.e. smaller than 100 - 10 multiplied by the size of the flowerbed then its valid so return the randomstartindex
//         randomStartIndex - flowerbed.size * 10 + 10 //   if not, then deduct the size of the flowerbed and multiply by the size of the board

 
//     for (let i = 0; i < flowerbed.size; i++) { //
//         if (isHorizontal) { //if isHorizontal is true, figure out which indexes we want to colour with sunflowers
//             flowerbedBlocks.push(allBoardBlocks[Number(validStart) + i]) //if the randomStartIndex is 5, then the first block will be 5, 6 and so on based on flowerbed.size
//         } else { //if vertical
//             flowerbedBlocks.push(allBoardBlocks[Number(validStart) + i * 10]) //if the randomStartIndex is 5, then the first block will be 5, 15 and so on based on flowerbed.size
//         }
//     }
//     let valid 

//     if (isHorizontal) { //further validation to prevent flowerbeds splitting and overlapping off the board
//     flowerbedBlocks.every((_flowerbedBlock, index) => 
//         valid = flowerbedBlocks[0].id % 10 !== 10 - (flowerbedBlocks.size - (index + 1))) //if horizontal is true, use every method to check each flower bed block in a loop
//     // take the first flowerbed block where modulus should not equal the size of  the flowerbed blocks minus the index plus 1
// } else { // if vertical
//     flowerbedBlocks.every((_flowerbedBlock, index) => {
//         const rowIndex = Math.floor(validStart / 10) + index;
//         const columnIndex = validStart % 10;
//         const row = rowIndex + 1;
//         // console.log(`Index: ${index}, Row: ${row}, Column: ${columnIndex + 1}`);
        
//     valid = flowerbedBlocks[0].id < 90 + (10 * index + 1)
// });
// }

// //Ensure that flowerbeds are not placed on top of eachother
//     const notTaken = flowerbedBlocks.every(flowerbedBlock => !flowerbedBlock.classList.contains('taken')) // cuse every method to check if every flowerbed contains the class taken, then we know its 'not taken'


//     if (valid && notTaken) { //if the valid variable above is valid, and the blocks are not taken then the flowerbed has been placed correctly and we can add the class name of taken to the flowerbedBlocks
//         flowerbedBlocks.forEach(flowerbedBlock => { //iterates over the flowerbedBlocks and adds the name of the flowerbed to the flowerbedBlocks
//             flowerbedBlock.classList.add(flowerbed.name) //adds the name of the flowerbed to the flowerbedBlocks
//             flowerbedBlock.classList.add('taken') //
//         })
//     } else {
//         addFlowerbedPiece(flowerbed) //if the flowerbed is not valid, then we call the function again to try and place the flowerbed in a different position
//     }
    
// }

// flowerbeds.forEach(flowerbed => addFlowerbedPiece(flowerbed)) //iterates over the flowerbeds array and adds the flowerbeds to the neighbour board    