function day11ChronalCharge() {
  console.time('timer');
  const gridSize = 300;
  // const gridSerialNumber = 18;
  // const gridSerialNumber = 42;
  const gridSerialNumber = 8199;

  console.log('-----------------PART 1-----------------');
  const squareSize = 3;
  let totalPowerMatrix = initMatrix(gridSize - squareSize + 1);
  let matrix = initMatrix(gridSize);

  fillMatrixWithPowerLevel(matrix, gridSize, gridSerialNumber);

  calcSquareTotalPower(squareSize, matrix, totalPowerMatrix);
  // printMatrix(matrix);
  const largestTotalPower3x3 = findLargestTotalPower(totalPowerMatrix);
  console.log(largestTotalPower3x3);

  // findSumPositiveAndNegative(matrix);

  console.log('-----------------PART 2-----------------');
  const squareForLargestTotalPower = findSquareForLargestTotalPower(matrix, totalPowerMatrix);
  console.log(squareForLargestTotalPower);

  // console.timeEnd('timer');
}

function findSquareForLargestTotalPower(matr) {
  let tPowerMatrix;
  let lgTotPower = {};
  let lgTotPowerArr = [];
  for (let sqSize = 1; sqSize <= matr.length; sqSize++) {
    tPowerMatrix = initMatrix(matr.length - sqSize + 1);
    // console.log(sqSize, tPowerMatrix.length);

    calcSquareTotalPower(sqSize, matr, tPowerMatrix);
    lgTotPower = findLargestTotalPower(tPowerMatrix);
    if (lgTotPower.totalPower < 0) { break; }
    lgTotPower.squareSize = sqSize;
    // console.log(lgTotPower);
    lgTotPowerArr.push(lgTotPower);
  }

  lgTotPower = lgTotPowerArr[0];
  for (let i = 1; i < lgTotPowerArr.length; i++) {
    if (lgTotPowerArr[i].totalPower > lgTotPower.totalPower) {
      lgTotPower = lgTotPowerArr[i];
    }
  }
  return lgTotPower;
}

function findLargestTotalPower(tPowerMatr) {
  let lgTotPow, lgX, lgY;
  lgTotPow = -1;
  lgX = lgY = 0;
  for (let y = 0; y < tPowerMatr.length; y++) {
    for (let x = 0; x < tPowerMatr.length; x++) {
      if (tPowerMatr[y][x] > lgTotPow) {
        lgX = x;
        lgY = y;
        lgTotPow = tPowerMatr[y][x];
        // console.log(lgTotPow, lgX, lgY);
      }
    }
  }
  return {
    x: lgX,
    y: lgY,
    totalPower: lgTotPow
  }
}

function calcSquareTotalPower(sqSize, matr, tPowerMatr) {
  const lastRowAndCol = matr.length - sqSize;
  let squareTotalPower = 0;
  for (let y = 0; y <= lastRowAndCol; y++) {
    for (let x = 0; x <= lastRowAndCol; x++) {
      squareTotalPower = 0;
      for (let yi = y; yi < y + sqSize; yi++) {
        for (let xi = x; xi < x + sqSize; xi++) {
          squareTotalPower += matr[yi][xi];
        }
      }
      // console.log(x, y, squareTotalPower);
      tPowerMatr[y][x] = squareTotalPower;
    }
  }
}

function fillMatrixWithPowerLevel(matr, grSize, sN) {
  for (let y = 0; y < grSize; y++) {
    for (let x = 0; x < grSize; x++) {
      matr[y][x] = getCellPowerLevel(x, y, sN);
    }
  }
}



function getCellPowerLevel(x, y, sN) {
  let rackID = x + 10;
  let powerLevel = (rackID * y + sN) * rackID;
  powerLevel = Math.floor((powerLevel % 1000) / 100) - 5;
  return powerLevel;
}

function initMatrix(size) {
  let arr = new Array(size);
  let row = new Array(size).fill(0);
  for (let i = 0; i < size; i++) {
    arr[i] = row.slice();
  }
  return arr;
}

// function findSumPositiveAndNegative(matr) {
//   let sumPos = 0, sumNeg = 0;
//   for (let y = 0; y < matr.length; y++) {
//     for (let x = 0; x < matr.length; x++) {
//       if (matr[y][x] >= 0) {
//         sumPos += matr[y][x];
//       } else {
//         sumNeg += matr[y][x];
//       }
//     }
//   }
//   console.log(`sumPos = ${sumPos}       sumNeg = ${sumNeg}`);
// }

// function printMatrix(matr) {
//   const matrSize = matr.length;
//   for (let y = 0; y < matrSize; y++) {
//     console.log(matr[y].join(' '));
//   }
// }


day11ChronalCharge();