// Create a class called flowerbed within this file and input the info from the config file (look into how to import props from a file) and pull this info into the game play functions later on // Function to read and load game configuration from flowerbed_config.ini file using Fetch API
export async function loadConfig() {
    const configFilePath = './flowerbed_config.ini';

    try {
        const response = await fetch(configFilePath);
        if (!response.ok) {
            throw new Error('Failed to load configuration from ${configFilePath}');
        }
        return await response.text();
    } catch (error) {
        console.error(error.message);
        return null;

    }
}

// Creating the boards

//function to initialises the game by creating the garden and neighbour boards and places flowerbeds based on the config file
export async function initialiseGame() {
    const flowerbedConfig = await loadConfig();

    if (!flowerbedConfig) {
        createFlowerbeds('garden', 'flowerbedConfig');
        createFlowerbeds('neighbour', 'flowerbedConfig');
    }
}