const fs = require("fs");
console.time('timer');

function marbleMania() {
  fs.readFile('./day9-input.txt', (err, data) => {
    let [players, lastMarble] = data.toString().split('\n')[0].match(/\d+/g);
    players = parseInt(players);
    lastMarble = parseInt(lastMarble);

    console.log('-----------------PART 1-----------------');
    let highestScore = getHighestScore(players, lastMarble);
    console.log(`${players} players; last marble is worth ${lastMarble} points: the winning Elf's score = ${highestScore}`);

    console.log('-----------------PART 2-----------------');
    lastMarble *= 100;
    highestScore = getHighestScore(players, lastMarble);
    console.log(`${players} players; last marble is worth ${lastMarble} points: the winning Elf's score = ${highestScore}`);


    console.timeEnd('timer');
  });
}

function getHighestScore(pls, lMarb) {
  console.log(pls, lMarb);
  let circle = [0, 1];
  let indCurMarb = 1; // index of Current Marble
  let indCurPlayer = 0; // number of Current Player
  let playersScore = new Array(pls).fill(0);

  for (let marble = 2; marble <= lMarb; marble++) {
    if (marble % 10000 === 0) console.log(marble);
    indCurPlayer = (indCurPlayer + 1 < pls) ? indCurPlayer + 1 : 0;
    if (marble % 23 !== 0) {
      indCurMarb = (indCurMarb + 2 <= circle.length) ? indCurMarb + 2 : 1;
      circle.splice(indCurMarb, 0, marble);
    } else {
      indCurMarb = indCurMarb -7;
      indCurMarb = (indCurMarb >= 0) ? indCurMarb : circle.length + indCurMarb;
      playersScore[indCurPlayer] += marble + circle.splice(indCurMarb, 1)[0];
    }
    // console.log(circle);
  }

  // console.log(playersScore);

  return Math.max( ...playersScore );
}

marbleMania();