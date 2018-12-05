const fs = require('fs');

// [1518-11-01 00:00] Guard #10 begins shift
// { id: id, totalsl: totalsl, slSched: sleepSchedule }


function strategy() {
    fs.readFile('./day4-input.txt', (err, data) => {
        const directions = data.toString();
        let arrOfStrings = directions.split('\n');
        let arrObjs = [];
        let arrGuards = [];
        let maxSleepGuard = {};
        let mostSleepMinute;
        let result1, result2;

        // remove last empty string in input data
        if (!arrOfStrings[arrOfStrings.length - 1]) {
            arrOfStrings.splice(-1, 1);
        }
        // console.log(arrOfStrings);

        arrOfStrings.forEach(element => {
            arrObjs.push(parseInputData(element));
        });
        // console.log(arrObjs);
        arrObjs.sort( (a, b) => a.ms - b.ms );
        // console.log(arrObjs);
        arrGuards = countSleepTime(arrObjs);
        // arrGuards.forEach( (el, i) => console.log(i, el) );

        maxSleepGuard = searchMaxElement(arrGuards);
        console.log('-------------------------------------------------------------------------------------------------');
        console.log(`The guard with #id = ${maxSleepGuard.i} has the most minutes asleep = ${maxSleepGuard.max} minutes`);

        mostSleepMinute = buildSleepSchedule(maxSleepGuard, arrObjs);
        console.log(`That guard spend asleep ${mostSleepMinute.max} times in ${mostSleepMinute.i} minute`);
        console.log('-------------------------------------------------------------------------------------------------');
        result1 = maxSleepGuard.i * mostSleepMinute.i;
        console.log(`Result 1 = ${result1}`);
        console.log('-------------------------------------------------------------------------------------------------');
        console.log();

        arrGuards = buildSleepSchedules(arrObjs);
        let minute = {guardID: -1, slMin: 0, slTimes: 0};
        arrGuards.forEach((guard, id) => {
            let mostSlMin = {};
            mostSlMin = searchMaxElement(guard.slShed);
            guard.mostSlMin = mostSlMin.i;
            guard.slTimes = mostSlMin.max;
            console.log(`Guard #ID = ${id}, slTime = ${guard.slTime}, mostSlMin = ${guard.mostSlMin}, slTimes = ${guard.slTimes}`);

            if (guard.slTimes > minute.slTimes) {
                minute.guardID = id;
                minute.slMin = guard.mostSlMin;
                minute.slTimes = guard.slTimes;
            }
        });

        console.log(`The guard with #ID = ${minute.guardID} is most frequently (${minute.slTimes} times) asleep on the same minute = ${minute.slMin}`);

        console.log('-------------------------------------------------------------------------------------------------');
        result2 = minute.guardID * minute.slMin;
        console.log(`Result 2 = ${result2}`);
        console.log('-------------------------------------------------------------------------------------------------');


    });
}

function parseInputData(data) {
    let arr2 = data.split('] ');
    let ms = Date.parse(arr2[0].slice(1));
    let description = arr2[1];
    return { ms: ms, desc: description };
}

function countSleepTime(arr) {
    let guards = [];
    let id;
    let sleepTime;
    for (let i = 0; i < arr.length; i++) {
        const desc = arr[i].desc;
        if (desc.includes('#')) {
            id = Number(desc.match(/\d+/)[0]);
            guards[id] = (guards[id] || 0);
            continue;
        }
        if (desc[0] === 'w') {
            sleepTime = (arr[i].ms - arr[i - 1].ms) / 60000;
            guards[id] += sleepTime;
        }
    }
    return guards;
}

function searchMaxElement(arr) {
    let maxElement = {
        i: -1,
        max: -1
    };
    arr.forEach( (el, i) => {
        if (el > maxElement.max) {
            maxElement.i = i;
            maxElement.max = el;
        }
    });
    return maxElement;
}

function buildSleepSchedule(guard, arr) {
    let id;
    let mostSlMin = {};
    let sleepSchedule = new Array(60);
    for (let i = 0; i < arr.length; i++) {
        const desc = arr[i].desc;
        if (desc.includes('#')) {
            id = Number(desc.match(/\d+/)[0]);
            continue;
        }
        if (id === guard.i && desc[0] === 'w') {
            const tsSleep = new Date(arr[i - 1].ms).getMinutes();
            const tsWake = new Date(arr[i].ms).getMinutes();
            // console.log(id,  arr[i].ms, tsSleep, tsWake);
            for (let j = tsSleep; j < tsWake; j++) {
                sleepSchedule[j] = (sleepSchedule[j] || 0) + 1;
            }
        }
    }
    mostSlMin = searchMaxElement(sleepSchedule);
    return mostSlMin;
}

function buildSleepSchedules(arr) {
    let guards = [];
    let id;
    let sleepTime;
    for (let i = 0; i < arr.length; i++) {
        const desc = arr[i].desc;
        if (desc.includes('#')) {
            id = Number(desc.match(/\d+/)[0]);
            guards[id] = (guards[id] || { slTime: 0, slShed: new Array(60), mostSlMin: -1, slTimes: 0 });
            continue;
        }
        if (desc[0] === 'w') {
            const tsSleep = new Date(arr[i - 1].ms).getMinutes();
            const tsWake = new Date(arr[i].ms).getMinutes();
            sleepTime = tsWake - tsSleep;
            guards[id].slTime += sleepTime;

            for (let j = tsSleep; j < tsWake; j++) {
                guards[id].slShed[j] = (guards[id].slShed[j] || 0) + 1;
            }
        }
    }

    return guards;
}

// guards[id] = [{ slTime: slTime, slShed: slShed , mostSlMin: mSlMin, slTimes: slTimes }, {  }]

strategy();