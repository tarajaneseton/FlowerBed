// reads the config file as text
// Create a class called flowerbed within this file and input the info from the config file (look into how to import props from a file) and pull this info into the game play functions later on // Function to read and load game configuration from flowerbed_config.ini file using Fetch API


// fetch the config, parse the config and split to create the flowerbeds and pass to initialise the game.
// im

export async function fetchConfig() {
    const config = '/flowerbed_config.ini';

    try {
        const response = await fetch(config); // using fetch to load the file into a variable called config
        if (!response.ok) {
            throw new Error('Failed to load configuration from ${config}');
        }
        return await response.text(); // parse the config file
    } catch (error) {
        console.error(error.message);
        return null;

    }
}

// Creating the boards

// Create a class called flowerbed within this file and input the info from the config file (look into how to import props from a file) and pull this info into the game play functions later on 
export async function initialiseGame() {
}

const data = await fetchConfig(); //


// Function to parse data string and construct an object
function parseData(dataString) {
    const dataArray = dataString.split('\n');
    const parsedData = {};

    dataArray.forEach(item => {
        const [type, value] = item.split(':').map(str => str.trim());
        if (type.toLowerCase() === 'board') {
            const [height, width] = value.split('x').map(size => parseInt(size.trim()));
            parsedData.board = {
                type: type,
                size: { height, width }
            };
        } else if (type.toLowerCase() === 'flowerbed') {
            const [name, size] = value.split(',').map(size => size.trim());
            parsedData[name] = {
                type: type,
                name: name,
                size: parseInt(size)
            };
        }
    });

    return parsedData;
}

// Calling the function to parse data and construct object
const parsedObject = parseData(data);

console.log(parsedObject); // Output the parsed object

export default parseData; // Export the parseData function



    // const data = flowerbedConfig.split("\n");  //split the config file into an array
    // configArray.forEach((line, index) => { // iterates over the lines
        // const [type, name, size] = line.trim().split(' '); 
        // const [type, name, size] = line.trim().split(' '); 
        // console.log(data); //remove
      
        
        // if (type === 'Flowerbed') { //if the type is flowerbed, then create a flowerbed
        //     const flowerbedSize = parseInt(size)

        //     if (isNaN(flowerbedSize)) { //if the flowerbed size is not a number, then log an error message
        //         console.error(`Invalid flowerbed size found on line ${index + 1}`);
        //         return;

    // console.log(configArray); //remove
    // return;
    
// }
//     }

    // function FlowerbedContainer()



    

       
            

        // flowerbeds[name] = flowerbedSize; //assigns the flowerbed name and size to the flowerbeds object
        // console.log(flowerbeds)
    

    // if (!flowerbedConfig) {
    //     createFlowerbeds('player', flowerbedConfig);
    //     createFlowerbeds('computer', flowerbedConfig);
    // }