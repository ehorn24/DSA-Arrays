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
  console.log(arr);
}

main();

//arr.push(3)
//length = 1, capacity = 0, ptr = 0
//capacity should have resized. Not sure why it didn't.

//arr.push the other values
//length = 6, capacity = 0, ptr = 0
//array has a length of 6. Same issue with capacity as above.
