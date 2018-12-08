const fs = require("fs");
console.time('timer');

function getLargestArea() {
  fs.readFile('./day6-input.txt', (err, data) => {
    let points = data.toString().split('\n');
    if (!points[points.length - 1]) {
      points.splice(-1, 1);
    }

    let matrix1d = [];
    let areas = [];
    let extremePoints = [];

    for (let i = 0; i < points.length; i++) {
      points[i] = points[i].split(', ');
      for (let j = 0; j < 2; j++) {
        points[i][j] = Number(points[i][j]);
      }
    }

    let { xMin, yMin, xMax, yMax } = getMinMaxCoordinates(points);
    // console.log(xMin, yMin, xMax, yMax);

    matrix1d = populateMatrix(xMin, yMin, xMax, yMax, points);

    for (let i = 0; i < points.length; i++) {
      areas.push({ point: i, area: countTimesElementInArr(i, matrix1d) });
    }

    areas.sort((a, b) => b.area - a.area);
    console.log('areas = ');
    console.log(areas);

    findExtremePoints(xMin, yMin, xMax, yMax, matrix1d, extremePoints);
    console.log(`extremePoints = ${extremePoints}`);

    for (let ind = 0; ind < areas.length; ind++) {
      const el = areas[ind];
      if (!extremePoints.includes(el.point)) {
        largestArea = el;
        break;
      }
    }

    console.log(`The size of the largest area that isn't infinite = ${largestArea.area},`);
    console.log(`that are closest to point number = ${largestArea.point},`);
    console.log(`with coordinates = ${points[largestArea.point]}.`);

    console.timeEnd('timer');
  });
}

function getMinMaxCoordinates(ps) {
  let xMin = xMax = ps[0][0],
    yMin = yMax = ps[0][1];
  ps.forEach((el) => {
    if (el[0] < xMin) { xMin = el[0]; }
    if (el[0] > xMax) { xMax = el[0]; }
    if (el[1] < yMin) { yMin = el[1]; }
    if (el[1] > yMax) { yMax = el[1]; }
  });
  return { xMin: xMin, yMin: yMin, xMax: xMax, yMax: yMax }
}

function calcDist(x, y, xP, yP) {
  return Math.abs(x - xP) + Math.abs(y - yP);
}

function populateMatrix(xMn, yMn, xMx, yMx, ps) {
  let l = 0;
  let matr1d = [];
  let arrDists = [];
  // let matrixStr = '';

  for (let y = yMn - 1; y <= yMx + 1; y++) {
    // matrixStr += '\n';
    for (let x = xMn - 1; x <= xMx + 1; x++) {
      let minDist = Number.MAX_VALUE;
      let minId = -1;

      ps.forEach((point, id) => {
        l = calcDist(x, y, point[0], point[1]);

        if (l < minDist) { minDist = l; minId = id; }
        arrDists[id] = l;
      });
      // console.log(`Coordinate ${x}, ${y}`, 'id =', minId, ', minDist = ', minDist);
      if (countTimesElementInArr(minDist, arrDists) > 1) {
        matr1d[y * xMx + x] = 'x';
        // matrixStr += 'x';
      } else {
        matr1d[y * xMx + x] = minId;
        // matrixStr += minId;
      };
    }
  }
  // console.log(matrixStr);
  return matr1d;
}

function countTimesElementInArr(el, arr) {
  return arr.filter(value => el === value).length;
}

function findExtremePoints(xMn, yMn, xMx, yMx, ps, extPoints) {
  for (let x = xMn; x < xMx; x++) {
    let pnt = ps[x + yMn * xMx];
    // console.log(pnt);
    if (!extPoints.includes(pnt)) { extPoints.push(pnt); }
    pnt = ps[x + yMx * xMx];
    // console.log(pnt);
    if (!extPoints.includes(pnt)) { extPoints.push(pnt); }
  }
  for (let y = yMn; y < yMx; y++) {
    let pnt = ps[xMn + y * xMx];
    // console.log(pnt);
    if (!extPoints.includes(pnt)) { extPoints.push(pnt); }
    pnt = ps[xMx + y * xMx];
    // console.log(pnt);
    if (!extPoints.includes(pnt)) { extPoints.push(pnt); }
  }
}


getLargestArea();
