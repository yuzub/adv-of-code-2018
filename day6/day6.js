const fs = require("fs");
console.time('timer');

function chronalCoordinates() {
  fs.readFile('./day6-input.txt', (err, data) => {
    let points = data.toString().split('\n');
    if (!points[points.length - 1]) {
      points.splice(-1, 1);
    }

    for (let i = 0; i < points.length; i++) {
      points[i] = points[i].split(', ');
      for (let j = 0; j < 2; j++) {
        points[i][j] = Number(points[i][j]);
      }
    }
  
    let { xMin, yMin, xMax, yMax } = getMinMaxCoordinates(points);
    // console.log(xMin, yMin, xMax, yMax);

    console.log('----------------PART 1----------------');
    const largestArea = getLargestArea(xMin, yMin, xMax, yMax, points);
    console.log(`The size of the largest area that isn't infinite = ${largestArea.area},`);
    console.log(`that are closest to point number = ${largestArea.point},`);
    console.log(`with coordinates = ${points[largestArea.point]}.`);
    
    console.log('----------------PART 2----------------');
    const maxTotalDist = 10000;
    const sizeRegion = getSizeRegion(xMin, yMin, xMax, yMax, points, maxTotalDist);
    console.log(`The size of the region containing all locations which have a total distance to all given coordinates of less than ${maxTotalDist} = ${sizeRegion}`);
    
    
    console.timeEnd('timer');
  });
}

function getSizeRegion(xMin, yMin, xMax, yMax, ps, dist) {
  let matrix1d = [];
  let size = 0;
  matrix1d = populateRegion(xMin, yMin, xMax, yMax, ps, dist);
  size = countTimesElementInArr('#', matrix1d);
  return size;
}

function populateRegion(xMin, yMin, xMax, yMax, ps, ds) {
  let l = 0;
  let matr1d = [];
  // let matrixStr = '';

  for (let y = yMin; y <= yMax; y++) {
    // matrixStr += '\n';
    for (let x = xMin; x <= xMax; x++) {
      let totalDistance = 0;

      ps.forEach((point, id) => {
        l = calcDist(x, y, point[0], point[1]);
        totalDistance += l;
      });

      if (totalDistance < ds) {
        matr1d[y * xMax + x] = '#';
        // matrixStr += '#';
      } else {
        matr1d[y * xMax + x] = '.';
        // matrixStr += '.';
      }
    }
  }
  // console.log(matrixStr);
  return matr1d;
}

function getLargestArea(xMin, yMin, xMax, yMax, ps) {
  let matrix1d = [];
  let areas = [];
  let extremePoints = [];

  matrix1d = populateMatrix(xMin, yMin, xMax, yMax, ps);

  for (let i = 0; i < ps.length; i++) {
    areas.push({ point: i, area: countTimesElementInArr(i, matrix1d) });
  }

  areas.sort((a, b) => b.area - a.area);
  // console.log('areas = ');
  // console.log(areas);

  findExtremePoints(xMin, yMin, xMax, yMax, matrix1d, extremePoints);
  // console.log(`extremePoints = ${extremePoints}`);

  let largestArea;
  for (let ind = 0; ind < areas.length; ind++) {
    const el = areas[ind];
    if (!extremePoints.includes(el.point)) {
      largestArea = el;
      break;
    }
  }

  return largestArea;
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

function populateMatrix(xMin, yMin, xMax, yMax, ps) {
  let l = 0;
  let matr1d = [];
  let arrDists = [];
  // let matrixStr = '';

  for (let y = yMin; y <= yMax; y++) {
    // matrixStr += '\n';
    for (let x = xMin; x <= xMax; x++) {
      let minDist = Number.MAX_VALUE;
      let minId = -1;

      ps.forEach((point, id) => {
        l = calcDist(x, y, point[0], point[1]);

        if (l < minDist) { minDist = l; minId = id; }
        arrDists[id] = l;
      });
      // console.log(`Coordinate ${x}, ${y}`, 'id =', minId, ', minDist = ', minDist);
      if (countTimesElementInArr(minDist, arrDists) > 1) {
        matr1d[y * xMax + x] = 'x';
        // matrixStr += 'x';
      } else {
        matr1d[y * xMax + x] = minId;
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

function findExtremePoints(xMin, yMin, xMax, yMax, ps, extPoints) {
  for (let x = xMin; x < xMax; x++) {
    let pnt = ps[x + yMin * xMax];
    // console.log(pnt);
    if (!extPoints.includes(pnt)) { extPoints.push(pnt); }
    pnt = ps[x + yMax * xMax];
    // console.log(pnt);
    if (!extPoints.includes(pnt)) { extPoints.push(pnt); }
  }
  for (let y = yMin; y < yMax; y++) {
    let pnt = ps[xMin + y * xMax];
    // console.log(pnt);
    if (!extPoints.includes(pnt)) { extPoints.push(pnt); }
    pnt = ps[xMax + y * xMax];
    // console.log(pnt);
    if (!extPoints.includes(pnt)) { extPoints.push(pnt); }
  }
}


chronalCoordinates();
