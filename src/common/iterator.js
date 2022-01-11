const obj = {
  a: 1,
  b: 2,
  c: 3,
};

obj[Symbol.iterator] = function () {
  const origin = this;
  const keys = Object.keys(origin);
  let count = 0;
  return {
    next() {
      if (count < keys.length) {
        return { value: origin[keys[count++]], done: false };
      } else {
        return { value: undefined, done: true };
      }
    },
  };
};

for (const iterator of obj) {
  console.log(iterator);
}
