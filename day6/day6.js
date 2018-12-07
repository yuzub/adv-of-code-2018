const fs = require("fs");
console.time('timer');

function getLargestArea() {
  fs.readFile('./day6-input-test.txt', (err, data) => {
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
    console.log(points);

    let { xMin, yMin, xMax, yMax } = getMinMaxCoordinates(points);
    console.log(xMin, yMin, xMax, yMax);

    populateMatrix(xMin, yMin, xMax, yMax, points);

    console.timeEnd('timer');
  });
}

function getMinMaxCoordinates(ps) {
    let xMin = xMax = ps[0][0], 
        yMin = yMax = ps[0][1];
    ps.forEach( (el) => {
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
    // console.log(xMin, yMin, xMax, yMax, ps, ps.length);
    let l = 0;
    let matrix1d = [];
    let arrDists = [];
    let matrixStr = '';

    for (let y = yMin - 1; y <= yMax + 1; y++) {
        matrixStr += '\n';
        for (let x = xMin - 1; x <= xMax + 1; x++) {
            let minDist = Number.MAX_VALUE;
            let minId = -1;

            console.log(`Coordinate ${x}, ${y}`);
            ps.forEach( (point, id) => {
                l = calcDist(x, y, point[0], point[1]);
                // console.log(id, point, `distance = ${l}`);

                if (l < minDist) { minDist = l; minId = id; }
                arrDists[id] = l;
            });
            console.log('id =', minId, ', minDist = ', minDist);
            console.log(arrDists);
            if (countTimesElementInArr(minDist, arrDists) > 1) { 
                matrix1d[y * xMax + x] = 'x';
                matrixStr += 'x';
                // console.log('x');
            } else {
                matrix1d[y * xMax + x] = minId;
                matrixStr += minId;
                // console.log(minId);                
            };
            // console.log(matrix1d);
        }
    }
    console.log(matrixStr);

}

function countTimesElementInArr (el, arr) {
    return arr.filter(value => el === value).length;
}


getLargestArea();
