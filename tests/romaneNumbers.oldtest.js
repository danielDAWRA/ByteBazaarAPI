import romanParseator from "./romaneNumbers.js";

const tests = [];

// ------------------------ TEST 1 ------------------------
function test1() {
  const reponse = romanParseator({ numberAsString: '1' });
  const expectedResponse = 'I';
  const passedTest = reponse === expectedResponse;
  tests.push(passedTest);
}
test1();

// ------------------------ TEST 2 ------------------------
function test2() {
  const reponse = romanParseator({ numberAsString: 'I' });
  const expectedResponse = 1;
  const passedTest = reponse === expectedResponse;
  tests.push(passedTest);
}
test2();

// ------------------------ TEST 4 ------------------------
function test4() {
  try {
    romanParseator(1);
  } catch (e) {
    const error = JSON.parse(e.message);
    const passedTest = error.code === 1 && error.msg === 'The argument must be an object that contains the numberAsString property';
    tests.push(passedTest);
  }
}
test4();

// ------------------------ TEST 5 ------------------------
function test5() {
  try {
    romanParseator({ numberAsString: 1 });
  } catch (e) {
    const error = JSON.parse(e.message);
    const passedTest = error.code === 2 && error.msg === 'The numberAsString property must be a string';
    tests.push(passedTest);
  }
}
test5();

// ------------------------ TEST 6 ------------------------
function test6() {
  try {
    romanParseator(6);
  } catch (e) {
    console.log(e.message);
    // tests.push(passedTest);
  }
}
test6();

// ------------------------ SUMMARY ------------------------
const failedTests = tests.filter((test) => !test);
if (!failedTests.length) {
  console.log('Congratulations! All test passed ✅');
} else {
  console.log('Oooooh! Your code sucks 🤢');
  tests.forEach((test, index) => {
    if (!test) {
      console.log(`The test number ${index + 1} failed ❌`);
    }
  });
}
