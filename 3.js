const Array = require("./array.js");

function main() {
  Array.SIZE_RATIO = 3;

  let arr = new Array();
  arr.push(3);
  arr.push(5);
  arr.push(15);
  arr.push(19);
  arr.push(45);
  arr.push(10);
  arr.pop();
  arr.pop();
  arr.pop();
  console.log(arr);
}

main();

//length = 3, capacity =0, ptr = 0.
//1st, 6 values were pushed to the array, then 3 values were removed starting with the last value in the array
