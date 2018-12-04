const fs = require('fs');



let arrDataClaims = [];
let fabric = [];

function countOverlapInches() {
    fs.readFile('./day3-input.txt', (err, data) => {
        const directions = data.toString();
        let arrOfStrings = directions.split('\n');

        // remove last empty string in input data
        if (!arrOfStrings[arrOfStrings.length - 1]) {
            arrOfStrings.splice(-1, 1);
        }

        // fabric = get2DArray(100);
        fabric = init2DArray(1000);

        const regExp = /\d+/g;
        arrOfStrings.forEach((element, index) => {
            let claim = {};
            let arrData = element.match(regExp).map(el => Number(el));
            [claim.id, claim.left, claim.top, claim.width, claim.height] = arrData;
            addClaim(claim);
            arrDataClaims.push(claim);
        });

        // console.log(fabric);

        // The first half of this puzzle
        let result = countElementInArray('X');
        console.log('Result = ', result);

        // The second half of this puzzle
        arrDataClaims.forEach(claim => {
            if ( (claim.width * claim.height) === countElementInArray(claim.id) ) {
                console.log('The ID of the claim that doesn\'t overlap =', claim.id);
            }

        });
        console.log('Done!');
    });
}

/* function get2DArray(size) {
    size = size > 0 ? size : 0;
    var arr = [];

    while (size--) {
        arr.push([]);
    }

    return arr;
} */

function init2DArray(size) {
    let arr = new Array(size);
    let row = new Array(size);
    for (let i = 0; i < size; i++) {
        row[i] = 0;
    }

    for (let i = 0; i < arr.length; i++) {
        arr[i] = row.slice(0);
    }

    return arr;
}

function addClaim(claimObj) {
    for (let i = claimObj.left; i < claimObj.left + claimObj.width; i++) {
        for (let j = claimObj.top; j < claimObj.top + claimObj.height; j++) {
            // if (fabric[j][i] !== 2) {
            //     fabric[j][i] = (fabric[j][i] || 0) + 1;
            // }
            if (fabric[j][i] === 0) {
                fabric[j][i] = claimObj.id;
            } else if (fabric !== 'X') {
                fabric[j][i] = 'X';
            }
        }
    }
}

function countElementInArray(elForCounting) {
    let res = 0;
    fabric.forEach((arr1d) => {
        res += arr1d.filter(el => el === elForCounting).length;
    });
    return res;
}

countOverlapInches();