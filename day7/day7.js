const fs = require("fs");
console.time('timer');

// Step C must be finished before step A can begin.

function getInstructions() {
  fs.readFile('./day7-input.txt', (err, data) => {
    let firsts = [], seconds = [], temp = [], stepOk;
    let result = [];
    let inputArr = data.toString().split('\n');
    if (!inputArr[inputArr.length - 1]) {
      inputArr.splice(-1, 1);
    }

    inputArr.forEach(str => {
      let [first, second] = str.match(/\s\w\s/g);
      firsts.push(first.trim());
      seconds.push(second.trim());
    });

    /*     insArr.forEach((el, i) => {
          console.log(el, firsts[i], seconds[i]);
        }); */


    while (firsts.length > 0) {

      for (let ind = 0; ind < firsts.length; ind++) {
        const step = firsts[ind];
        if (temp.includes(step)) {
          continue;
        }
        else if (!seconds.includes(step)) {
          temp.push(step);
        }
      }

      temp.sort(cbSortAlpha);

      curStep = temp.shift();
      result.push(curStep);

      while (firsts.includes(curStep)) {
        let i = firsts.indexOf(curStep);
        firsts.splice(i, 1);
        if (seconds.length === 1) {
          result.push(seconds[0]);
        }
        seconds.splice(i, 1);
      }

      console.log(`Result = ${result}`);

    }

    const res = result.join('');
    console.log(res);

    console.timeEnd('timer');
  });
}

function cbSortAlpha(a, b) {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  // a должно быть равным b
  return 0;
}

getInstructions();