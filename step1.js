// Importing the 'fs' module (File System)
const fs = require('fs');
const process = require('process');

// Function to read and print the contents of a file
function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:\n  ${err}`);
      process.exit(1); // Exits with error code
    }
    console.log(data);
  });
}

// Reading the path from command line arguments
const path = process.argv[2];
if (!path) {
  console.error("Please provide a file path as an argument.");
  process.exit(1);
}

// Calling the cat function with the provided path
cat(path);
