function romanToDecimal({ splittedNumber, romanLetters }) {
  if (splittedNumber.filter((letter) => !romanLetters.includes(letter)).length !== 0) {
    const myError = {
      code: 3,
      msg: 'The entered number is not valid ',
    };

    throw new Error(JSON.stringify(myError));
  }

  const decimalNumbers = [];

  for (let i = 0; i < splittedNumber.length; i++) { // [X, X, X, I, X]
    const char = splittedNumber[i];
    const charIndexAtRomanLetters = romanLetters.indexOf(char);

    const rest = charIndexAtRomanLetters % 2;
    const numberOfZeros = (charIndexAtRomanLetters - rest) / 2;

    const arrayOfZeros = new Array(numberOfZeros).fill(0);
    // const arrayOfZeros = [];
    // for (let i = 0; i < numberOfZeros; i++) {
    //   arrayOfZeros.push(0);
    // }

    const initialNumber = rest === 0 ? 1 : 5;
    const decimalNumberAsArray = [initialNumber, ...arrayOfZeros];
    const decimalNumberAsString = decimalNumberAsArray.join('');
    const decimalNumber = parseInt(decimalNumberAsString, 10);

    const nextChar = splittedNumber[i + 1];
    const nextCharIndexAtRomanLetters = romanLetters.indexOf(nextChar);
    const isLowerThanNext = charIndexAtRomanLetters < nextCharIndexAtRomanLetters;
    const decimalNumberToPush = isLowerThanNext ? decimalNumber * -1 : decimalNumber;
    decimalNumbers.push(decimalNumberToPush);
  }

  return decimalNumbers.reduce((acc, next) => acc + next);
}

function decimalToRoman({ splittedNumber, romanLetters }) {
  let romanNumber = '';
  for (let i = 0; i < splittedNumber.length; i++) { // [3, 1, 6]
    const digit = splittedNumber[i]; // 1

    const position = splittedNumber.length - i;

    // position === 1 (unidades), position === 2 (decenas), position === 3 (centenas)
    // [5] === [5].length - i = 0 === 1 - 0 === 1 ===> unidades

    // [5, ?] === [5, ?].length - i = 0 === 2 - 0 === 2 ===> decenas
    // [?, 0] === [?, 0].length - i = 1 === 2 - 1 === 1 ===> unidades

    // [1, ?, ?] === [1, ?, ?].length - i = 0 === 3 - 0 === 3 ===> centenas
    // [?, 0, ?] === [?, 0, ?].length - i = 1 === 3 - 1 === 2 ===> decenas
    // [?, ?, 0] === [?, ?, 0].length - i = 2 === 3 - 2 === 1 ===> unidades

    const firstRomanIndexByPos = (position - 1) * 2; // ['I', 'V', 'X', 'L', 'C']
    // unidades === (1 - 1) * 2 === firstRomanIndexByPosition => 0 === I
    // decenas === (2 - 1) * 2 === firstRomanIndexByPosition => 2 === X
    // centenas === (3 - 1) * 2 === firstRomanIndexByPosition => 4 === C
    const secondRomanIndexByPos = firstRomanIndexByPos + 1;
    // unidades === 0 + 1 === secondRomanIndexByPosition => 1 === V
    // decenas === 2 + 1 === secondRomanIndexByPosition => 3 === L
    // centenas === 4 + 1 === secondRomanIndexByPosition => 5 === no configurado
    const thirdRomanIndexByPos = firstRomanIndexByPos + 2;
    // unidades === 0 + 2 === thirdRomanIndexByPosition => 2 === X
    // decenas === 2 + 2 === thirdRomanIndexByPosition => 4 === C
    // centenas === 4 + 2 === thirdRomanIndexByPosition => 6 === no configurado

    // centenas === [C, no configurado, no configurado]
    // decenas === [X, L, C]
    // unidades === [I, V, X]

    const digitAsInt = parseInt(digit, 10);
    if (digitAsInt % 5 && digitAsInt % 5 <= 3) {
      if (digitAsInt > 5) {
        romanNumber += romanLetters[secondRomanIndexByPos];
      }

      for (let j = 0; j < digitAsInt % 5; j++) {
        romanNumber += romanLetters[firstRomanIndexByPos];
      }
    } else if (digitAsInt % 5 === 4) {
      romanNumber += romanLetters[firstRomanIndexByPos];
      romanNumber += romanLetters[digitAsInt < 5 ? secondRomanIndexByPos : thirdRomanIndexByPos];
    } else if (digitAsInt === 5) {
      romanNumber += romanLetters[secondRomanIndexByPos];
    }
  }

  return romanNumber;
}

export { decimalToRoman, romanToDecimal };
