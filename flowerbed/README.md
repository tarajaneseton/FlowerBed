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
    1. Sunflower 🌻 - Length 5
    2. Tulip 🌷 - Length 4
    3. Hibiscus 🌺 - Length 3
    4. Hyacinth 🪻 - Length 3 
    5. Rose 🌹 - Length 2

- It will be a two player game (player v computer)

- The game is played in turns, where each player ‘waters a plant’ (by calling out a board coordinate) and the
neighbour indicates whether the 'water' resulted in a "hit" or "miss". A "hit" indicates that the called
position corresponded to a valid ship coordinate, otherwise it is a "miss". Players record their called
positions using their targetboard; a record of both “hits” and “misses” should be recorded.

d. Analysis and decomposition of the overall problem into key ‘epic’ style tasks (linked to 1b, 1c).

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