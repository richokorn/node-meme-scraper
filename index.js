import fs from 'fs';
import https from 'https';
import fetch from 'node-fetch';

// code for fetching, currently fetches entire body, this works.
const response = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);

// Variable Declarations
let dumpHTML = await response.text();
let indexOfFirst = dumpHTML.indexOf(`src="https://api.memegen.link/images/`);
let indexOfLast = dumpHTML.indexOf('?width=300');
let indexOfSlash = dumpHTML.indexOf('/', indexOfFirst + 37);
let srcString = dumpHTML.slice(indexOfFirst + 5, indexOfLast);
let srcTemplate = dumpHTML.slice(indexOfFirst + 37, indexOfSlash);
const specialString = `https://api.memegen.link/images/${process.argv[3]}/${process.argv[2]}.jpg`;

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

// A function to remove everything from the start of the dumpHTML
// including up until the end of and including the first instance of `?width=300`
function cutHTML() {
  dumpHTML = dumpHTML.slice(indexOfLast + 10);
  return dumpHTML;
}

// A function to check all templates in templateArray and remove `.jpg?width=300" `

// Logic to repeat the cut and renew functions 10 times and print the HTML results in the console
// Download logic is primarily from: https://sebhastian.com/nodejs-download-file/ - 2021 - How to download a file using NodeJS without any extra package
// Printing to console happens *before* `cutHTML();` because we'd lose the first meme

// STRETCH

if (process.argv[2]) {
  https.get(specialString, (res) => {
    const path = `./memes/${process.argv[2]} - ${process.argv[3]}.jpg`;
    const writeStream = fs.createWriteStream(path);
    console.log(
      `Now using ${specialString} to create a "${process.argv[3]}" meme with the top text of "${process.argv[2]}".`,
    );
    res.pipe(writeStream);
    writeStream.on('finish', () => {
      writeStream.close();
    });
  });
} else {
  let count = 0;

  // many thanks to José Fernando Höwer Barbosa for helping me understand writing pure functions for asynchronous things
  // good energy to you my friend

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

  while (count < 10) {
    count++;
    renewIndexes();
    console.log(`Now retrieving ${count}: ${srcString}`);
    download(count < 10 ? '0' + count : count);
    cutHTML();
  }
  console.log('Download Completed');
}
