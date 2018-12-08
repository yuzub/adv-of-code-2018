const fs = require("fs");
console.time('timer');

let inputArr = [];
let i;
let metadataSum = 0;
let valueRootNode = 0;

function memoryManeuver() {
  fs.readFile('./day8-input.txt', (err, data) => {
    inputArr = (data.toString().split('\n')[0]).split(' ');
    for (let ind = 0; ind < inputArr.length; ind++) {
      inputArr[ind] = Number(inputArr[ind]);
    };

    // part1
    console.log('----------------------PART 1----------------------');
    i = 0;
    parseNode();
    console.log(`The sum of all metadata entries = ${metadataSum}`);

    // part2
    console.log('----------------------PART 2----------------------');
    i = 0;
    valueRootNode = findValueNode();
    console.log(`The value of the root node = ${valueRootNode}`);

    console.timeEnd('timer');
  });
}

function parseNode() {
  let childQuantity = inputArr[i++];
  let metadataQuantity = inputArr[i++];
  while (childQuantity-- > 0) {
    parseNode();
  }
  for (let ind = i; ind < i + metadataQuantity; ind++) {
    metadataSum += inputArr[ind];
  }
  i += metadataQuantity;
}

function findValueNode() {
  let childQuantity = inputArr[i++];
  let metadataQuantity = inputArr[i++];
  let value = 0;
  let valueChildNodes = [];

  if (childQuantity === 0) {
    for (let ind = i; ind < i + metadataQuantity; ind++) {
      value += inputArr[ind];
    }
  } else {
    while (childQuantity-- > 0) {
      valueChildNodes.push(findValueNode());
    }
    for (let ind = i; ind < i + metadataQuantity; ind++) {
      value += (valueChildNodes[inputArr[ind] - 1] || 0);
    }    
  }

  i += metadataQuantity;
  return value;
}


memoryManeuver();
