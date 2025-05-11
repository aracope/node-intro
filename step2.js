// Importing required modules
const fs = require('fs');
const process = require('process');
const axios = require('axios');

// Function to read and print the contents of a file
function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:\n  ${err}`);
      process.exit(1);
    }
    console.log(data);
  });
}

// Function to fetch and print the contents of a URL
async function webCat(url) {
  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (err) {
    console.error(`Error fetching ${url}:\n  ${err}`);
    process.exit(1);
  }
}

// Reading the path or URL from command line arguments
const pathOrUrl = process.argv[2];
if (!pathOrUrl) {
  console.error("Please provide a file path or URL as an argument.");
  process.exit(1);
}

// Check if the argument is a URL (starts with "http" or "https")
if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
  webCat(pathOrUrl);
} else {
  cat(pathOrUrl);
}
