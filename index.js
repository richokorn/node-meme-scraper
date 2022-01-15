import fs from 'node:fs';
import https from 'node:https';
import fetch from 'node-fetch';

// Fetch and assign HTML code from link.
const response = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);

// Variable Declarations

let dumpHTML = await response.text();
let indexOfFirst = dumpHTML.indexOf(`src="https://api.memegen.link/images/`);
let indexOfLast = dumpHTML.indexOf('.jpg?width=300');
let indexOfSlash = dumpHTML.indexOf('/', indexOfFirst + 37);
let srcString = dumpHTML.slice(indexOfFirst + 5, indexOfLast + 4);
let srcTemplate = dumpHTML.slice(indexOfFirst + 37, indexOfSlash);

// Nested shorthand if expression to check if there are
// arguments for top and bottom text
const specialString = `https://api.memegen.link/images/${process.argv[3]}${
  process.argv[4]
    ? `/${process.argv[4]}${process.argv[5] ? `/${process.argv[5]}` : ''}`
    : ''
}.jpg`;

// Declares 'templateArray' which has many meme templates assigned to.
const templateArray = [];

// // All the functions:

// many thanks to José Fernando Höwer Barbosa for helping me understand writing pure functions for asynchronous things
// good energy to you my friend

// This function handles downloading the image itself, filenaming and pathing
function download(i, x) {
  https.get(srcString, (res) => {
    const path = `./memes/${i}.jpg`;
    const writeStream = fs.createWriteStream(path);
    res.pipe(writeStream);
    writeStream.on('finish', () => {
      writeStream.close();
    });
    console.log(`Saving ${i}: ${x}`);
  });
}

// This function renews the indexes,
function renewIndexes() {
  indexOfFirst = dumpHTML.indexOf(`src="https://api.memegen.link/images/`);
  indexOfLast = dumpHTML.indexOf('?width=300');
  indexOfSlash = dumpHTML.indexOf('/', indexOfFirst + 37);
  srcString = dumpHTML.slice(indexOfFirst + 5, indexOfLast);
  srcTemplate = dumpHTML.slice(indexOfFirst + 37, indexOfSlash);
}

// A function to remove everything from the start of the current dumpHTML
// Up until
function cutHTML() {
  dumpHTML = dumpHTML.slice(indexOfLast + 10);
}

// // Program Start

if (process.argv[2] === 'scrape') {
  const scrapeTotal = process.argv[3];
  if (process.argv[3] < 50) {
    console.log(`
    Now scraping the first ${process.argv[3]} memes.
    `);
  } else {
    console.log(`
    Now scraping the first ${process.argv[3]} memes.
    RIP console terminal.
    `);
  }
  let miniCount = 0;
  while (miniCount < scrapeTotal) {
    miniCount++;
    renewIndexes();
    download(miniCount < 10 ? '0' + miniCount : miniCount, srcString);
    cutHTML();
  }
}
// Nested shorthand if expressions to check if there is
// top and bottom text, or no text at all
// to make an appropriate file-name title.
else if (process.argv[2] === 'custom') {
  if (process.argv[3]) {
    https.get(specialString, (res) => {
      const path = `./memes/${process.argv[3]}${
        process.argv[4]
          ? ` - ${process.argv[4]}${
              process.argv[5] ? ` - ${process.argv[5]}` : ''
            }`
          : ''
      }.jpg`;

      const writeStream = fs.createWriteStream(path);

      // Prints a confirmation message to the console using
      // nested shorthand if expressions to check if there is
      // top and bottom text, or no text at all.
      console.log(`
Now saving ${specialString}.
It is a ${process.argv[3]} meme${
        process.argv[4]
          ? ` with a top text of ${process.argv[4]}${
              process.argv[5] ? ` and a bottom text of ${process.argv[5]}` : ''
            }`
          : ''
      }.
`);
      res.pipe(writeStream);
      writeStream.on('finish', () => {
        writeStream.close();
      });
    });
  }
  let templateCount = 0;
  while (templateCount < 50) {
    templateCount++;
    renewIndexes();
    templateArray.push(srcTemplate);
    cutHTML();
  }
  templateArray.forEach((element, index) => {
    const position = element.search('.jpg');
    if (position > -1) {
      templateArray[index] = element.substring(0, position);
    }
  });
  console.log(templateArray);
} else {
  console.log(`
    ### Welcome to the Meme Scraper! ###

    My thanks go to Karl and José for explaining Sync & Async differences.

    Valid arguments:

    - [scrape] [10]
      Scrapes the first 10 memes. Try changing the number!

    - [custom]
      Shows a list of several meme templates.

    - [custom] [doge] [karl_and_jose] [thankyou!]
      Downloads a doge meme with top text "karl and jose"
      and a bottom text of "thankyou!"
      `);
}
