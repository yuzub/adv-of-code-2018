const fs = require("fs");

function polymer() {
  fs.readFile("./day5-input-test.txt", (err, data) => {
    let inputPolymer = data.toString().trim();
    let polymer = inputPolymer;

    polymer = reactPolymer(polymer);
    // console.log(`Polymer after fully reacting is ${polymer}`);
    console.log(`Units remain ${polymer.length}`);

    let arrPolymers = makeVarPolymer(inputPolymer);
    console.log(arrPolymers);
  });
}

function reactPolymer(pol) {
  let reactPol = pol;
  let i = 0;

  while (i < reactPol.length) {
    const ch = reactPol[i];
    const nextCh = reactPol[i + 1];
    // console.log(ch, nextCh);

    if (ch === ch.toLowerCase()) {
      // The character is lowercase
      if (ch.toUpperCase() === nextCh) {
        reactPol = deleteTwoLetters(reactPol, i);
        i = 0;
        continue;
      }
    } else {
      // The character is uppercase
      if (ch.toLowerCase() === nextCh) {
        reactPol = deleteTwoLetters(reactPol, i);
        i = 0;
        continue;
      }
    }

    i++;
  }

  return reactPol;
}

function deleteTwoLetters(str, firstLetPosition) {
  const resultStr =
    str.slice(0, firstLetPosition) + str.slice(firstLetPosition + 2);
  // console.log(resultStr);
  return resultStr;
}

function makeVarPolymer(pol) {
  console.log(pol);
  let arrVarPolymer = [];
  let ch = "";
  let newPolymer = "";
  let polLen = 0;
  for (let code = 65; code < 90; code++) {
    ch = String.fromCharCode(code);
    if (pol.includes(ch)) {
      newPolymer = pol.replace(ch, "").replace(ch.toLowerCase(), "");
      polLen = newPolymer.length;
      arrVarPolymer.push({
        char: ch,
        newPkl: newPolymer,
        reactPolymerLength: polLen
      });
    }
  }
  return arrVarPolymer;
}

polymer();
