// Importing required modules
const fs = require('fs');
const process = require('process');
const axios = require('axios');

// Function to read a file and return the content
function cat(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(`Error reading ${path}:\n  ${err}`);
      } else {
        resolve(data);
      }
    });
  });
}

// Function to fetch a URL and return the content
async function webCat(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    throw new Error(`Error fetching ${url}:\n  ${err}`);
  }
}

// Function to write content to a file
function outputToFile(content, outputPath) {
  fs.writeFile(outputPath, content, 'utf8', (err) => {
    if (err) {
      console.error(`Couldn't write ${outputPath}:\n  ${err}`);
      process.exit(1);
    }
  });
}

// Function to process input (file or URL) and optionally write output
async function processInput(input, outputPath = null) {
  let content;
  if (input.startsWith("http://") || input.startsWith("https://")) {
    content = await webCat(input);
  } else {
    content = await cat(input);
  }

  if (outputPath) {
    outputToFile(content, outputPath);
  } else {
    console.log(content);
  }
}

// Reading command line arguments
const args = process.argv.slice(2);

if (args[0] === '--out') {
  const outputPath = args[1];
  const input = args[2];
  if (!input) {
    console.error("Please provide a file path or URL to read.");
    process.exit(1);
  }
  processInput(input, outputPath);
} else {
  const input = args[0];
  if (!input) {
    console.error("Please provide a file path or URL to read.");
    process.exit(1);
  }
  processInput(input);
}
