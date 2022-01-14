import fs from 'fs';
import https from 'https';
import fetch from 'node-fetch';

// code for fetching, currently fetches entire body, this works.
const response = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);

// // Variable Declarations

// Assigns HTML response to dumpHTML
let dumpHTML = await response.text();

// Declares 'indexOfFirst', assigning to it the index number of the first discovered instance of 'src="https://api.memegen.link/images/'
let indexOfFirst = dumpHTML.indexOf(`src="https://api.memegen.link/images/`);

// Declares 'indexOfLast', assigning to it the index number of first instance of '.jpg?width=300', typically right after 'src="https://api.memegen.link/images/'
let indexOfLast = dumpHTML.indexOf('.jpg?width=300');

// Declares 'indexOfSlash', assigning to it the index number of the first instance of a slash symbol after 'indexOfFirst'
let indexOfSlash = dumpHTML.indexOf('/', indexOfFirst + 37);

// Declares 'srcString', assigning to it the string between the index numbers of the start of 'https://api.memegen.link/images/' and start of '?width=300'
// console.log will spit out a clean HTML string of the meme src eg. 'https://api.memegen.link/images/keanu.jpg'
let srcString = dumpHTML.slice(indexOfFirst + 5, indexOfLast + 4);

// Declares 'srcTemplate', assigning to it the string between the index numbers of the *end* of 'indexOfFirst' and 'indexOfSlash'
// This will spit out a clean string of the meme template eg. 'bender'
// There are issues with this, when a meme does not have any text on it, but are handled later.
let srcTemplate = dumpHTML.slice(indexOfFirst + 37, indexOfSlash);

// Declares an array of possible arguments to be used in the meme scraper when started
const commands = [' number ', ' custom ', ' help '];

// Declares 'specialString', assigning to it the link later used for the stretch goal, which takes the inputs of the user to make a custom meme.
let specialString = `https://api.memegen.link/images/${process.argv[3]}/${process.argv[4]}/${process.argv[5]}.jpg`;

// Declares 'templateArray' which has many meme templates assigned to.
const templateArray = [];

// // All the functions:

// many thanks to José Fernando Höwer Barbosa for helping me understand writing pure functions for asynchronous things
// good energy to you my friend

// This function handles downloading the image itself, filenaming and pathing
function download(i) {
  https.get(srcString, (res) => {
    const path = `./memes/${i}.jpg`;
    const writeStream = fs.createWriteStream(path);
    console.log(i);
    res.pipe(writeStream);
    writeStream.on('finish', () => {
      writeStream.close();
    });
  });
}

// this function renews the indexes,
// Expected: new index numbers reassigned once the original one has been cut out after cutHTML() has been called.
function renewIndexes() {
  indexOfFirst = dumpHTML.indexOf(`src="https://api.memegen.link/images/`);
  indexOfLast = dumpHTML.indexOf('?width=300');
  indexOfSlash = dumpHTML.indexOf('/', indexOfFirst + 37);
  srcString = dumpHTML.slice(indexOfFirst + 5, indexOfLast);
  srcTemplate = dumpHTML.slice(indexOfFirst + 37, indexOfSlash);
  return indexOfFirst, indexOfLast, indexOfSlash, srcString, srcTemplate;
}

// A function to remove everything from the start of the dumpHTML including up until the end of and including the first instance of `?width=300`
function cutHTML() {
  dumpHTML = dumpHTML.slice(indexOfLast + 10);
  return dumpHTML;
}

// // Program Start

function numberOption() {}

if (process.argv[3] === 'number') {
  const scrapeTotal = process.argv[4];
  let miniCount = 0;
  while (miniCount < scrapeTotal) {
    miniCount++;
    renewIndexes();
    console.log(`Now retrieving ${miniCount}: ${srcString}`);
    download(miniCount < 10 ? '0' + miniCount : miniCount);
    cutHTML();
  }
} else if (process.argv[3] === 'custom') {
  if (process.argv[4]) {
    https.get(specialString, (res) => {
      const path = `./memes/${process.argv[4]} - ${process.argv[5]} - ${process.argv[6]}.jpg`;
      const writeStream = fs.createWriteStream(path);
      console.log(
        `Now using ${specialString} to create a "${process.argv[4]}" meme with the top text of "${process.argv[5]}" and bottom text of "${process.argv[6]}".`,
      );
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
    console.log(`Now adding ${srcTemplate} to ${templateArray}`);
    templateArray.push(srcTemplate);
    console.log(templateArray);
    cutHTML();
  }
  templateArray.forEach((element, index) => {
    console.log(`element:${element}`);
    const position = element.search('.jpg');
    if (position > -1) {
      templateArray[index] = element.substring(0, position);
    }
  });
  console.log(templateArray);
} else if (process.argv[3] === 'help') {
  console.log(`
  Need help? Gotcha fam.

    - Typing "node index.js 10" will scrape the first
      10 memes from https://memegen-link-examples-upleveled.netlify.app/.
      --- Feel free to change the 10 to something else, like number 20!

    - Typing "node index.js custom bender karl" will create a meme
      using the "bender" template, with the top text "karl"
      --- If you want to use multple words,
          please add underscore between each word eg. "karl's_koding_kourse"

      --- If you would like to have bottom text as well,
          put a space after your top-text argument, eg. "karl horky"

      --- If you leave out the template and text arguments,
          a list of possible meme templates will be shown.

    - Typing "node index.js help" will just bring you back here.
      --- Its okay to ask for help. Many thanks to Karl and José.
`);
} else {
  console.log(`
    Welcome to the Meme Scraper!
    The following arguments are allowed after "node index.js": ${commands}
    We recommend using "help" for first timers! :)`);
}
