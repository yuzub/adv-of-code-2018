const fs = require('fs');

// The first half of this puzzle

let countLetter2 = 0;
let countLetter3 = 0;

function checksum() {
    fs.readFile('./day2-input.txt', (err, data) => {
        const directions = data.toString();
        let arrOfStrings = directions.split('\n');

        arrOfStrings.forEach(element => {
            countRepeatedLetters(element);
        });
        
        console.log(`The checksum is = ${countLetter2} * ${countLetter3} = ${countLetter2 * countLetter3}`);
    });
}

function countRepeatedLetters(str) {
    let twice = false, thrice = false;

    while (str.length !== 0) {
        let countLetter = 0;
        let pos = -1;
        while ((pos = str.indexOf(str[0], pos + 1)) !== -1) {
            countLetter++;
        }
        if (countLetter === 2 && !twice) {
            countLetter2++;
            twice = true;
        }
        if (countLetter === 3 && !thrice) {
            countLetter3++;
            thrice = true;
        }
        if (twice && thrice) {
            break;
        }

        str = str.split(str[0]).join('');
    }
}

checksum();

// The second half of this puzzle

function findCommonLetters() {
    fs.readFile('./day2-input.txt', (err, data) => {
        const directions = data.toString();
        let arrOfStrings = directions.split('\n');
        let result = null;

        for (let iCurStr = 0; iCurStr < arrOfStrings.length; iCurStr++) {
            for (let iNextString = iCurStr + 1; iNextString < arrOfStrings.length; iNextString++) {
                let curStr = arrOfStrings[iCurStr];
                let nextStr = arrOfStrings[iNextString];
                let indexOfOnlyDifChar = searchOneDifChar(curStr, nextStr);
                if(indexOfOnlyDifChar) {
                    console.log(iCurStr, curStr, iNextString, nextStr, 'indexOfOnlyDifChar =', indexOfOnlyDifChar);
                    result = curStr.slice(0, indexOfOnlyDifChar) + curStr.slice(indexOfOnlyDifChar + 1);
                    break;
                };
            }
            if (result) {
                break;
            }
        }

        console.log(`Letters are common between the two correct box IDs: ${(result) ? result : 'none right boxes.'}`);

    });
}

function searchOneDifChar(str1, str2) {
    let countDifChar = 0;
    let iDifChar = '';
    for (let i = 0; i < str1.length; i++) {
        if (str1[i] !== str2[i]) {
            countDifChar++;
            iDifChar = i;
            if (countDifChar > 1) {
                break;
            }
        }
    }
    // console.log(countDifChar);
    return (countDifChar === 1) ? iDifChar : null;
}

findCommonLetters();