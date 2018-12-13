const fs = require("fs");
console.time('timer');

function day12SubterraneanSustainability() {
  fs.readFile('./day12-input.txt', (err, data) => {
    let inputArr = data.toString().split('\n');
    if (!inputArr[inputArr.length - 1]) {
      inputArr.splice(-1, 1);
    }
    let pots = inputArr[0].slice(inputArr[0].search(/[.#]/));
    console.log(pots);
    let notes = [];
    for (let ind = 2; ind < inputArr.length; ind++) {
      let note = inputArr[ind];
      notes.push({
        pattern: note.substr(0, 5),
        result: note.slice(-1)
      });
    }
    console.log(notes);
    console.log(notes.length);



    console.timeEnd('timer');
  });
}


day12SubterraneanSustainability();