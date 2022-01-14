const testArray = ['bender', 'doge', 'keanu.jpg'];

testArray.forEach((element, index) => {
  console.log(`element:${element}`);
  const position = element.search('.jpg');
  if (position > -1) {
    testArray[index] = element.substring(0, position);
  }
});
console.log(testArray);
