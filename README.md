henlo fren

# Node.js Meme Scraper -

Link in Question: https://memegen-link-examples-upleveled.netlify.app/

#### Keep this TODO synced with: https://github.com/upleveled/btcmp-webfs-cohort-2022-01-jan/issues/58

## TODO:

- [x] Create a folder called `memes`
- [x] Create a Javascript file called `index.js`
- [x] Create a `.gitignore`

  - [x] Add a new line at the bottom of the file with the name of the `memes` folder

- [x] Visit the Netlify link https://memegen-link-examples-upleveled.netlify.app/

  - [x] "asking the server for data" - Request the server for data aka. "creating a request" or "connecting to the website"
  - [x] The data returned will include HTML (this will be of the data type `string`.)

- [x] Process the HTML string to create an array of image URL's // filter out all src

  - [x] Search the website for the `src` of the `img` tags (the URL of the images)

- [ ] Download the images: for each of the images:

  - [x] Retrieve the URL (src) to the current image
  - [x] Limit the loop to only the first 10 images
    - [ ] Download the image data from the URL in a variable
    - [ ] Save the image to `memes` using a counting up title `01.jpg`, `02.jpg`, and so on until `10.jpg`

- [ ] The program should be able to run multiple times
  - [ ] The program should first delete/clear the contents of the `memes` folder so subsequent runs have an empty folder to work with.

## Plan: Research -> Write Code -> Finalize

- [x] Write this plan
- [x] Extrapolate all steps
- [x] Research terminology
- [x] Google for links and throw it in
- [x] Section off info for each step

===

- [x] Write pseudo-code, ie. what each step is supposed to do at its _simplest_
- [x] Match research links to pseudo-code sections
- [x] Test actual snippets of code. A bit at a time.
- `Ctrl-#` to comment/uncomment out a section of code.
- `Alt-Shift-Down` to duplicate a line down
- `Ctrl-Shift-K` to delete the whole line

===

## Hyperlink Dump

#### URL itself

- [RECENT - How to read GET data from a URL using JavaScript?](https://stackoverflow.com/questions/814613/how-to-read-get-data-from-a-url-using-javascript/55576345#55576345
- [`MDN - URLSearchParams.get()`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/get)

#### Making a HTTP Request/GET

- [NODEJS - How do I make a http request? - CAUTION ONLY HTTP](https://nodejs.org/en/knowledge/HTTP/clients/how-to-create-a-HTTP-request/)
- [NODEJS - Making HTTP requests with Node.js - CAUTION ONLY HTTP](https://nodejs.dev/learn/making-http-requests-with-nodejs)

#### Making a HTTPS Request/GET

- [NODEJS - `HTTPS`](https://nodejs.org/api/https.html)
- [NODEJS - `https.request(url[, options][, callback])`](https://nodejs.org/api/https.html#httpsrequestoptions-callback)
- [NODEJS - `https.get();`](https://nodejs.org/api/https.html#httpsgeturl-options-callback)

#### Saving files to a folder

- [NODEJS - `path.resolve([...paths])`](https://nodejs.org/api/path.html#pathresolvepaths)
- [NODEJS - Paths](https://nodejs.org/api/path.html)
- [NODEJS LIBRARY - `fs` libaray](https://nodejs.org/api/fs.html)

#### Filtering out from a string

- [MDN - `String.prototype.indexOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf)
- [MDN - `String.prototype.search()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search)

#### Removing a slice from a string using index positions

- [2013 - Remove a character using index position](https://stackoverflow.com/questions/11116501/remove-a-character-at-a-certain-position-in-a-string-javascript)

#### Saving a file

- [2021 - How to download a file using NodeJS without any extra package](https://sebhastian.com/nodejs-download-file/)

#### Progress Bars in CLI/Node.js

- [2019 - Build a Command-Line Progress Bar in Node.JS](https://blog.bitsrc.io/build-a-command-line-progress-bar-in-node-js-5702a3525a49)

#### Alternative to If statements - Ternary Operators - Used in the naming sequence

- [2020 - 5 Alternatives to ‘If’ Statements for Conditional Branching](https://betterprogramming.pub/5-alternatives-to-if-statements-for-conditional-branching-6e8e6e97430b)
