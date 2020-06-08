const Memory = require("./memory.js");

class Array {
  constructor() {
    //array starts with length of 0
    this.length = 0;
    //array starts with capacity of 0
    this._capacity = 0;
    //pointer to 0 blocks of Memory
    this.ptr = new Memory().allocate(this.length);
  }

  _resize(size) {
    //get the old Memory address for existing values
    const oldPtr = this.ptr;
    //allocate new space for Memory
    this.ptr = new Memory().allocate(size);
    //if pointer is invalid, throw error
    if (this.ptr === null) {
      throw new Error("Out of Memory");
    }
    //copy existing values from the old chunk (oldPtr) to the new chunk (this.ptr)
    new Memory().copy(this.ptr, oldPtr, this.length);
    //free up the old chunk
    new Memory().free(oldPtr);
  }

  //add new value to end of array
  push(value) {
    //if the length of the array is greater than the capacity, array gets resized with Size Ratio
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }
    new Memory().set(this.ptr + this.length, value);
    this.length++;
  }

  //retrieve values
  get(index) {
    //if the index is less than 0 or greater/equal to the array length, throw error
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }
    //get Memory address by adding the index to the start position (this.ptr)
    return new Memory().get(this.ptr + index);
  }

  //pop/remove a value from the end of the array
  pop() {
    //if array length is 0, throw error
    if (this.length === 0) {
      throw new Error("index error");
    }
    //set value as the last Memory address in the array (length - 1)
    const value = new Memory().get(this.ptr + this.length - 1);
    //remove 1 from the array length
    this.length--;
    return value;
  }

  //insert value into some point in the array
  insert(index, value) {
    //if index given is less than 0 or greater than array length, throw error
    if (index < 0 || index >= this.length) {
      throw new Error("index error");
    }
    //if array length is greater than/equal to array capacity, resize
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }
    //copy the values at the old index (this.ptr + index) to the new index (this.ptr + index + 1), shift all the values after the new index back 1 position
    new Memory().copy(
      this.ptr + index + 1,
      this.ptr + index,
      this.length - index
    );
    //set the value at the new Memory address (this.ptr + index)
    new Memory().set(this.ptr + index, value);
    //increase array length by 1
    this.length++;
  }

  //remove values
  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }
    //copy the values starting at the old index (this.ptr + index + 1) to the new index (this.ptr + index), shift values backwards to fill space of removed value
    new Memory().copy(
      this.ptr + index,
      this.ptr + index + 1,
      this.length - index - 1
    );
    //decrease array length by 1
    this.length--;
  }
}

module.exports = Array;
