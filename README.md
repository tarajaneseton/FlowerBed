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

- 2 10x10 boards: a gardenBoard and a neighbourBoard. The gardenBoard is used to position and hold record of the location of your flower beds and any watering made by neighbours. The neighbourBoard is used to keep track of where you have fired and the outcome - hit or miss.

- The boards will make use of a coordinate system where letters represent columns and numbers represent rows.

- To start the game, each player must place all their flowerbeds on their gardenBoard. As your default opponent is the computer, you should set up your own board first and have the computer decide where to place its ships (auto place)

- The flowerbeds have different sizes and can be either be placed horizontally or vertically. Flowerbeds must be not overlap and neighbouring cells must be left empty.

- By default there are five type of flowerbeds:
    1. Sunflower 🌻 - Length 6
    2. Tulip 🌷 - Length 5
    3. Hibiscus 🌺 - Length 4
    4. Hyacinth 🪻 - Length 3 
    5. Rose 🌹 - Length 2

- It will be a two player game (player v computer)

- The game is played in turns, where each player ‘waters a plant’ (by calling out a board coordinate) and the
neighbour indicates whether the 'water' resulted in a "hit" or "miss". A "hit" indicates that the called
position corresponded to a valid ship coordinate, otherwise it is a "miss". Players record their called
positions using their targetboard; a record of both “hits” and “misses” should be recorded.

d. Analysis and decomposition of the overall problem into key ‘epic’ style tasks (linked to 1b, 1c).

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


e. Initial object-oriented design ideas and planned phased breakdown into smaller tasks(linked to 1d).

2. Development (academic standard: merit level detail: section required for merit) – 15%
a. Adoption and use of ‘good’ standards(linked to 1a, 1b, 1c).
b. Phase 1 development: tasks, code review and changes(linked to 1d,1e).
c. ..repeated for each development phase.
d. Phase n development: tasks, code review and changes(linked to 1d,1e).
e. Ensuring quality through testing and resolving bugs(linked to 1a, 1b, 2a, 2b..2c).
f. Reflection on key design challenges, innovations and how they were solved (with examples).
3. Evaluation (academic standard: distinction level detail: section required for distinction) – 10%
a. Analysis with embedded examples of key code refactoring, reuse, smells.
b. Implementation and effective use of ‘advanced’ programming principles(with examples).
c. Featuresshowcase and embedded innovations(with examples) - opportunity to ‘highlight’ best bits.
d. Improved algorithms – research, design, implementation, and tested confirmation (with examples).
e. Reflective review, opportunitiesto improve and continued professional development.