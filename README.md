#FlowerBed 
## A peaceful adaptation of the classic 'Battleship' game. 

## 1. Challenge Outline

### 1a. Summary and review of the problem and an overall proposed solution
The task was to create 'AdaShip', a clone of the class 'Battleship' game using an object-oriented approach. As a default, AdaShip is a two-player, turn based game of sea warfare. You and an opponent each place a number of ships on your own board. You then alternate turns "firing" torpedoes at each other’s ships. The game is won when one player has destroyed/sunk all of the other player’s ships.

I felt that there was enough war going on in the world and decided to adapt AdaShip to create a more peaceful game. I came up with FlowerBed, a two-player, turn based game of gardening where you and your neighbour each place 5 flowerbeds on your own garden, and then take it in turns to water the plants on eachother's garden. The game is won when one player has watered all of the other player's plants and the flowerbed is in full bloom.

I chose to develop FlowerBed in a Javascript framework using a graphical user interface (GUI) because I wanted to develop a project that had a visual element. 

b. UML style diagram illustrating initial overall solution 

### 1c. Initial working plan, overall approach, development strategy and approach to quality 

In order to help plan and prioritise tasks for the build of FlowerBed, I read through my assignment document and broke the work down into smaller tasks. The first version or MVP  of FlowerBed should have:

- It will be a two player game (player v computer)

- By default there are five type of flowerbeds:
    1. Sunflower 🌻 - Length 6
    2. Tulip 🌷 - Length 5
    3. Hibiscus 🌺 - Length 4
    4. Hyacinth 🪻 - Length 3 
    5. Rose 🌹 - Length 2

- Two 10x10 boards: a player board and a computer board. The player's board is used to position and hold record of the location of the flower beds and any watering made by the computer. The computer's board is used to keep track of where the player has watered and the outcome - hit or miss.

- The boards will make use of a coordinate system where letters represent columns and numbers represent rows.

- To start the game, the computer's flowerbeds are automatically placed. The player must then place all of their flowerbeds on their own board. 

- Flowerbeds are placed using drag and drop

- The flowerbeds have different sizes and can be either be placed horizontally or vertically by clicking the rotate button. Flowerbeds must be not overlap and neighbouring cells must be left empty.

- To water the computer's flowers you click on squares on the computer's board. Each 'hit' on a flowerbed is recorded as a flower being watered. When the whole flowerbed has been watered, its considered a 'watered flowerbed'

- The game is played in turns, where each player ‘waters a flower' (by clicking on a board coordinate) and the info display indicates whether the 'water' resulted in a "hit" or "miss". A "hit" indicates that the clicked position corresponded to a valid flowerbed coordinate, otherwise it is a "miss" and the info display will read: "no flowerbeds were watered this time". 

###Overall Approach:

This project will follow an Agile development methodology with iterative development cycles. I'll be using vanilla JavaScript for core functionalities, html and css for the styling and construction of the setup page and main game page.

###Development Strategy:

I'll use Git for version control and maintain a clean codebase with proper indentation and commenting. I've used Prettier for formatting.

###Approach to Quality:

The game will be thoroughly tested on different browsers and devices. I'll use Chrome's browser developer tools for debugging and if I have time I'll consider getting user feedback from friends or family to identify usability issues.

##Analysis and decomposition of the overall problem into key ‘epic’ style tasks and planned phased breakdown into smaller tasks

FB004:
- removed numbering and added coordinates
- created loadConfig function to read from config.ini file
- created initialiseGame function to load boards and flowerbeds based on config file
- added code to rotate button so that rotation considers the coordinates
- installed http-server so that I can view code in browser and view config file safely
- increased the size of the boards so that the coordinates are visible
- currently the numbers and letters are the wrong way around, needs to be corrected

FB005:
- corrected coordinates by fixing for loops in createBoard()
- updated board styling with new font and spacing

FB006: 
- each flowerbed now has unique size due to parseInt() associating flowerbed name with size
- added reset, quit game and continue buttons
- commented out ROTATE functionality, going to work on that later
- changed flowerbed names to be lowercase

FB007:
- created Flowerbed class to create the flowerbeds for the neighbour/computer board
- addFlowerbedPiece(flowerbed) adds each flowerbed to the neighbour board
- added functionality to allow random placement on board for all ships
- created validStart variable to start ensuring ship placement doesn't go off the board - need to add more to this
- forEach loop to iterate over the flowerbedBlocks and adds the name of the flowerbed and the class 'watered'
- added rose emoji to the rose flowerbed on the neighbour board

FB008:
- Created the valid variable which ensures the correct placement of all flowerbeds
- Validation is correct for Horizontal flowerbeds, however vertical flowerbeds are still going off the board
- Flowerbeds no longer overlap
- Removed width variable and hard coded in size of board, 10 x 10
- Might need to factor in coordinates and convert to numbers so that vertical works correctly, or implement rotate button

FB009: 
- Started to use modules
- loadGame.js file now holds initialiseGame() + loadConfig()
- boards.js file now holds createBoard()
- Boards are visible and functioning

FB010:
- flowerBeds.js file now holds Flowerbeds class and createFlowerbeds() module
- player1 folder holds placeFlowerbeds.js file with functionality for placing flowerbeds on board
- added emoji styling to the neighbour board's flowerbed blocks
- updated names of user's for consistency to identify id issues
- still have issues with reading 'size'

FB011:
- config ini file is now being read out logged to the console

FB012:
- removed config file and all related code
- reverted to using class for flowerbed
- Created a function to handle drag start events for flowerbeds.
- Created a function to handle drag over events to visually indicate potential placement.
- Created a function to handle drop events, validating placement logic and adding flowerbeds to the board

FB013: 
- Time is running out and implementing modularisation after having written the code is complicating things. I will revert back to having everything in the same file.
- Fixed rotate() function, which now rotates the flowerbeds that are located in the option container
- Added game play functionality for player 1: dragStart(), dragOver(), dropFlowerbed()
- Once Player 1 has placed their boards the game can start, added startGame() function and button
- Added handleClick() to determine if player has successfully watered a flowerbed
- Added functionality for computerTurn()
- Tried to fix problems with flowerbeds.length not being read by simplifying the addFlowerbedPiece function, need to incorporate error handling 

FB014:
- added setup page for index.html and styled it
- created new pages for oneplayer game and quit game
- added fucntionality for one player and quit game buttons
- removed unused files, create file for boards.js

FB015: 
- rename flowerbeds parameter in the addFlowerbedPiece function to avoid confusion with the global variable flowerbeds
- refactored addFlowerbedPiece function by replacing ternary operators with if-else statements, updated .id with dataset.coordinates, added error handling to ensure that the parameters are provided


##2. Development
There are some issues that I have been unable  to fix. The logic for valid placement of flowerbeds on the computer's board isn't working each time. I created a maxAttempts to prevent an infinite loop that was occuring, however even with it set to 1000, there are still occasions where the validity of the flowerbeds cannot be maintained which usggests that there are improvements that need to be paid to the addFlowerbedPiece function.

###a. Adoption and use of ‘good’ standards
I've tried to keep my functions simple and have chosen consistent naming conventions for better undetstanding.I have used descriptive class names like taken, watered and empty to enhance code readability. 
I have used event listeners for drag and drop interactions. 
I have included comments that are written with simplicity and ease. 


## 3. Evaluation 

### a. Analysis with embedded examples of key code refactoring, reuse, smells.
 notDropped: I changed the name of this variable to isPlaced for better understanding.
### b. Implementation and effective use of ‘advanced’ programming principles(with examples).

After building the basic functionality for the Flowerbeds game with 2 boards that are 10x10 in size with coordinates, 6 ships of different sizes and functions to autoplace and manually place the flowerbeds, I was advised to go back and incorporate modularisation into my code as well as proper use of  the .ini file. I referred back to my UML diagram and edited the classes that I had originally planned. I began separating my code into separate files, I started with the simplest functions first that had the fewest amount of dependencies. I installed Node and then tried to swap out my use of things like query selector which uses the DOM. However I faced difficulties when trying to import the addFlowerbedPiece function. I found myself getting confused between NPM, Node and vanilla javascript and use of DOM. I spent quite alot of time trying to change the structure of my code and in the end I decided to stick to one file rather than use modularisation. In hindsight if I had the time to learn and understand OOP and modularisation to begin with i could have started from a better place.

### e. Reflective review, opportunitiesto improve and continued professional development.

- Unit Testing: I haven't included unit tests, I didn't have time to implement these. It would be useful to test the validity and robustness of my core functionalities like testing the placement of the flowerbeds, detecting whether flowers or flowerbeds have been watered as well as game state updates like hits, current score and who's winning. 
- Code: Many of my functions are complicated and go over many lines. It would have been good to break these down into smaller and more focused functions. There are a few functions that aren't working correctly, such as the placement of the player's flowerbeds where there is duplication. I spent a long tiem trying to work out why my addflowerbedpiece function doesnt work, but I could have separated the horizontal and vertical logic. In addition, smaller, more focused would have made my debugging easier when trying to fix the issues. 
- Error handling for addFlowerbedPiece function. Currently, this function randomly attempts to place flowerbeds for the computer until considered valid after a maximum of 1000 attempts. I have increased the attempts from 10, all the way to 1000 and there are still issues with the placement of the computer's flowerbeds - there is still invalidity. It could have been better to implement a better placement algorithm or introduce a new action after failure/invalidity such as skipping the computer's turn

Continued Professional Development:

1. Learn Unit Testing
2. Learn advanced JavaScript concepts such as object-oriented programming principles, modules, and design patterns.
3. Learn a front-end framework like React to structure my user interface and make use of components more effectively 