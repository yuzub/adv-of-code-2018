const fs = require("fs");

function polymer() {
  fs.readFile("./day5-input.txt", (err, data) => {
    console.time('timer');
    let inputPolymer = data.toString().trim();
    let polymer = inputPolymer;

    polymer = reactPolymer(polymer);
    console.log('----------------------- PART 1 --------------------------------')
    // console.log(`Polymer after fully reacting is ${polymer}`);
    console.log(`Units remain ${polymer.length}`);
    console.log('----------------------- PART 2 --------------------------------')

    let minPolCharAndLength = makeVarPolymer(inputPolymer);
    console.log(`Removing all ${minPolCharAndLength.minCh}/${minPolCharAndLength.minCh.toLowerCase()} units is best.`);
    console.log(`The length of the shortest polymer is ${minPolCharAndLength.minPolLength}.`);
    console.log('-------------------------------------------------------')
    console.timeEnd('timer');
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
  let ch = '', minCh = '';
  let newPolymer = '';
  let polLength = 0, minPolLength = pol.length;
  for (let code = 65; code < 90; code++) {
    ch = String.fromCharCode(code);
    console.log(ch);
    if (pol.includes(ch)) {
      // delete character - uppercase and lowercase
      let regExp = new RegExp(`[${ch}${ch.toLowerCase()}]`, 'g');
      newPolymer = pol.replace(regExp, '');
      console.log(`All ${ch} deleted.`)
      // react polymer
      newPolymer = reactPolymer(newPolymer);
      polLength = newPolymer.length;
      console.log(`The length of the polymer is ${polLength}.`);

      if (polLength < minPolLength) {
        minCh = ch;
        minPolLength = polLength;
      }
    }
  }
  return { minCh: minCh, minPolLength: minPolLength };
}

polymer();
