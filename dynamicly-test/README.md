# dynamicly-test
In order to run, please run command: "npm start", at the root. It will then run "npm run" on both server & client folders.

Question 1)

function sumAllElementsByName(items, targetName) {
  return items.reduce(
    (acc, element) =>
      element.name === targetName
        ? {
            sum: acc.sum + element.value,
            avg: (acc.sum + element.value) / ++acc.count,
            count: acc.count,
          }
        : { sum: acc.sum, avg: acc.avg, count: acc.count },
    { sum: 0, count: 0, avg: 0 }
  ).sum;
}

Question 2)

function avgAllElementsByName(items, targetName) {
  return items.reduce(
    (acc, element) =>
      element.name === targetName
        ? {
            sum: acc.sum + element.value,
            avg: (acc.sum + element.value) / ++acc.count,
            count: acc.count,
          }
        : { sum: acc.sum, avg: acc.avg, count: acc.count },
    { sum: 0, count: 0, avg: 0 }
  ).avg;
}

Question 3)

/**
 * sum all items value based on name in 1 single line using array reduce
 * @function sumAllElementsByName
 * @param {object} items the objects array to calculate the sum
 * @param {string}  targetName the target name 
 * @return {number} sum of all items value that is equal to targetName
 */

/**
 * average all items value based on name in 1 single line using array reduce
 * @function avgAllElementsByName
 * @param {object} items the objects array to calculate the sum
 * @param {string}  targetName the target name 
 * @return {number} average of all items value that is equal to targetName
 */

Question 4)

a)static methods can not be called on instances of the class. Instead, they're called on the class itself. We can fix it by changing to "A.concatenameFields(...values)" or remove "static" keyword

b & c)
//**********

// This function will have a side effect and return its input
// const makeRequest = require("some-request-library");
const makeRequest = async (value) => {
  return value;
};
/**
 * Creates a new word
 * @class
 */
class A {
  /**
   * constructor description
   * @param  {string} someField create new instance with a provided string
   */
  constructor(someField) {
    this._someField = someField;
    this._separator = " ";
  }

  /** concatenameFields method will concentrate the array args into a string word
   * @param {object} instance the object
   * @param {array} values the test input array
   * @return {string} the concentrated value
   */
  concatenameFields(instance, values) {
    return values.join(instance._separator);
  }
  /**
   * converting the original object arrays into string array then call concentrate function
   * @param {object} instance the object
   * @param {array} items the test input objects array
   * @return {string} the final result
   */
  async save(instance, items) {
    const values = items.map((name) => name.name);
    const finalValue = this.concatenameFields(instance, values);
    const result = await makeRequest(finalValue);
    return `THE RESULT IS: ${result}`;
  }
}
/**
 * Class representing a word.
 * @extends A
 */
class B extends A {
  /**
   * constructor description
   * @param  {string} someField create new instance with a provided string
   */
  constructor(someField) {
    super(someField);
    this._separator = "-";
  }
  //A normal method, public one
  /** concatenameFields method will concentrate the array args into a string word
   * @param {array} values the test input array
   * @return {string} the concentrated value
   */
  concatenameFields(...values) {
    return `[${super.concatenameFields(...values)}]`;
  }
}

async function testQuestion4() {
  const testInput = [
    { name: "this" },
    { name: "test" },
    { name: "is" },
    { name: "fun" },
  ];

  const a = new A("base A");
  const b = new B("base B");
  console.log("b", b);
  const aResult = await a.save(a, testInput);
  const bResult = await b.save(b, testInput);

  //as the testing doesn't have someField property so I remove it on concentratedFields
  const aIsOK = aResult === "THE RESULT IS: this test is fun";
  const bIsOK = bResult === "THE RESULT IS: [this-test-is-fun]";
  console.log(aResult, bResult);
  return aIsOK && bIsOK;
}


