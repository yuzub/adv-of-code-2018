const fs = require("fs");
console.time('timer');

let xArr = [], yArr = [], vxArr = [], vyArr = [];
let numPoints;

function day10StarsAlign() {
  fs.readFile('./day10-input.txt', (err, data) => {
    let inputArr = data.toString().split('\n');
    if (!inputArr[inputArr.length - 1]) {
      inputArr.splice(-1, 1);
    }
    numPoints = inputArr.length;

    inputArr.forEach((str, i) => {
      let [x, y, vx, vy] = str.match(/[ -]*\d+/g);
      xArr.push(parseInt(x.trim()));
      yArr.push(parseInt(y.trim()));
      vxArr.push(parseInt(vx.trim()));
      vyArr.push(parseInt(vy.trim()));
    });

    let s = 0;
    let extremeCoor = {};
    let deltaY = Number.MAX_VALUE;
    let newDeltaY = 0;
    let isDeltaLess = true;

    while (isDeltaLess) {
      s++;
      movePoints(1);
      extremeCoor = findMinMaxCoor();
      newDeltaY = extremeCoor.yMax - extremeCoor.yMin;
      isDeltaLess = deltaY > newDeltaY;
      deltaY = newDeltaY;
    }
    console.log('-------------MESSAGE--------------');
    movePoints(-1);
    extremeCoor = findMinMaxCoor();
    // console.log(extremeCoor);
    // console.log('deltaX', extremeCoor.xMax - extremeCoor.xMin, 'deltaY', extremeCoor.yMax - extremeCoor.yMin);
    drawMes(extremeCoor);
    console.log(`Elves would have needed to wait for that message to appear exactly ${s - 1} seconds`);
    console.log();


    console.timeEnd('timer');
  });
}

function movePoints(direction) {
  for (let i = 0; i < numPoints; i++) {
    xArr[i] += direction * vxArr[i];
    yArr[i] += direction * vyArr[i];
  }
}

function findMinMaxCoor() {
  return {
    xMin: Math.min(...xArr),
    xMax: Math.max(...xArr),
    yMin: Math.min(...yArr),
    yMax: Math.max(...yArr)
  }
}

function drawMes(extCoor) {
  let str = ''; 

  let matrix1d = [];

  for (let i = 0; i < numPoints; i++) {
    let yx1d = (yArr[i] - extCoor.yMin) * (extCoor.xMax - extCoor.xMin + 1) + xArr[i] - extCoor.xMin;
    matrix1d[yx1d] = true;
  }

  for (let y = 0; y <= extCoor.yMax - extCoor.yMin; y++) {
    str += '\n';
    for (let x = 0; x <= extCoor.xMax - extCoor.xMin; x++) {
      let yAndX = y * (extCoor.xMax - extCoor.xMin + 1) + x;
      if (matrix1d[yAndX]) {
        str += '#';
      } else {
        str += '.';
      }
    }
  }
  str += '\n';

  console.log(str);
}

day10StarsAlign();