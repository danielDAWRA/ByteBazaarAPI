/* eslint-disable no-import-assign */
import romanParseator from "./romaneNumbers.js";
import * as parseators from './parseators.js';

function decimalToRomanMock({ splittedNumber, romanLetters }) {
  if (splittedNumber[0] === '1') {
    return 'I';
  }
  if (splittedNumber[0] === '2') {
    return 'II';
  }
  return '?';
}

function romanToDecimalMock({ splittedNumber, romanLetters }) {
  if (splittedNumber[0] === 'I') {
    return 1;
  }
  if (splittedNumber[0] === 'II') {
    return 2;
  }
  return 0;
}
beforeAll(() => {
  parseators.decimalToRoman = jest.fn().mockImplementation(decimalToRomanMock);
  parseators.romanToDecimal = jest.fn().mockImplementation(romanToDecimalMock);
});

// Se puede ecribir describe.skip o test.skip para que no se ejecute un grupo de tests o un test
// Se puede escrbir describe.only o test.only para que solo se ejecute un grupo de tests o un test
describe('validation params', () => {
  test('No argument', () => {
    try {
      romanParseator();
    } catch (e) {
      const error = JSON.parse(e.message);
      expect(error.code).toBe(0);
      expect(error.msg).toBe('The argument must be an object that contains the numberAsString property');
    }
  });

  test('The argument isn´t an object', () => {
    try {
      romanParseator({});
    } catch (e) {
      const error = JSON.parse(e.message);
      expect(error.code).toBe(1);
      expect(error.msg).toBe('The argument must be an object that contains the numberAsString property');
    }
  });

  test('The numberAsString is not string', () => {
    try {
      romanParseator({ numberAsString: 2 });
    } catch (e) {
      const error = JSON.parse(e.message);
      expect(error.code).toBe(2);
      expect(error.msg).toBe('The numberAsString property must be a string');
    }
  });
});

describe('Functonality tests', () => {
  test('Decimal to roman', () => {
    const result = romanParseator({ numberAsString: '1' });
    expect(result).toBe('I');

    // Checkeamos que se haya llamado a la funcion siguiendo el flujo
    expect(parseators.decimalToRoman).toHaveBeenCalled();
    const namedParams = {
      splittedNumber: ['1'],
      romanLetters: ['I', 'V', 'X', 'L', 'C', 'D', 'M'],
    };
    // Checkeamos que se haya llamado a la funcion conn esos parametros en este caso
    expect(parseators.decimalToRoman).toHaveBeenCalledWith(namedParams);
  });

  test('Roman to roman', () => {
    const result = romanParseator({ numberAsString: 'I' });
    expect(result).toBe(1);
  });
});
