const fs = require('fs');

let startingFrequency = 0;
let arrResultingFrequency = [];

function readInputData() {
    fs.readFile('./day1-input.txt', (err, data) => {
        const directions = data.toString();
        let arrOfStrings = directions.split('\n');

        calcResFreq(arrOfStrings);

        findTwiceFreq(arrOfStrings);
    });
}

function calcResFreq(arr) {
    let result = arr.reduce((previousValue, currentValue) => {
        return previousValue + parseInt(currentValue);
    }, startingFrequency);

    console.log('Resulting frequency = ', result);
}

function findTwiceFreq(arr) {
    let curResultingFrequency = startingFrequency;
    let done = false;
    while (!done) {
        for (let index = 0; index < arr.length; index++) {
            curResultingFrequency += parseInt(arr[index]);
            if (arrResultingFrequency.includes(curResultingFrequency)) {
                done = true;
                break;
            }
            arrResultingFrequency.push(curResultingFrequency);
        };
    };
    console.log('Twice value of resulting frequency = ', curResultingFrequency, arrResultingFrequency.includes(curResultingFrequency));
}

readInputData();