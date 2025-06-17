// TODO: Import required modules
// Hint: You will need the 'fs' module for reading the file and the 'chalk' library for coloring the words.
const fs = require('fs');
const chalk = require('chalk');

/**
 * Synchronously reads the content of 'declaration.txt'.
 * @returns {string} The content of the file.
 */
function readFileContent() {
    const filePath = 'declaration.txt';
    try {
        const data = fs.readFileSync(filePath, 'utf8'); // Read file synchronously
        return data;
    } catch (err) {
        console.error(`Error reading the file: ${err}`);
        return '';
    }
}

/**
 * Gets the word count from the content.
 * @param {string} content The file content.
 * @returns {Object} An object with words as keys and their occurrences as values.
 */
function getWordCounts(content) {
    // TODO: Implement a function to count occurrences of each word in the content.
    // Hint: Consider splitting the content into words and then tallying the counts.
    const wordCount = {};
    const words = content.toLowerCase().split(/\W+/).filter(Boolean); // Splitting by non-word characters.

    for (const word of words) {
        wordCount[word] = (wordCount[word] || 0) + 1; // Increment the count for each word.
    }

    return wordCount;
}

/**
 * Colors a word based on its frequency.
 * @param {string} word The word to be colored.
 * @param {number} count The frequency of the word.
 * @returns {string} The colored word.
 */
function colorWord(word, count) {
    // TODO: Return the word colored based on its frequency using the 'chalk' library.
    // For example: 
    // - Words that occur once can be blue
    // - Words that occur between 2 and 5 times can be green
    // - Words that occur more than 5 times can be red
    if (count === 1) {
        return chalk.blue(word); // Words that occur once are blue
    } else if (count >= 2 && count <= 5) {
        return chalk.green(word); // Words that occur between 2 and 5 times are green
    } else {
        return chalk.red(word); // Words that occur more than 5 times are red
    }
}

/**
 * Prints the first 15 lines of the content with colored words.
 * @param {string} content The file content.
 * @param {Object} wordCount The word occurrences.
 */
function printColoredLines(content, wordCount) {
    const lines = content.split('\n').slice(0, 15);

    for (const line of lines) {
        const coloredLine = line.split(/\W+/).map(word => {
            // TODO: Color the word based on its frequency using the 'colorWord' function.
            if (word) {
                const normalizedWord = word.toLowerCase(); // Normalize the word to lowercase
                const count = wordCount[normalizedWord] || 0; // Get the count of the word, default to 0 if not found
                return colorWord(word, count); // Color the word based on its frequency
            }
            return word; // Return the word as is if it's empty
        }).join(' ');

        console.log(coloredLine);
    }
}

/**
 * Main function to read the file, count the word occurrences and print the colored lines.
 */
function processFile() {
    const content = readFileContent();
    const wordCount = getWordCounts(content);
    printColoredLines(content, wordCount);
}

if (require.main === module) {
    // This will execute only if the file is run directly.
    processFile();
}

// TODO: Export the functions for testing
// Hint: You can use the 'module.exports' syntax.
module.exports = {
    readFileContent,
    getWordCounts,
    colorWord,
    printColoredLines,
    processFile
};
