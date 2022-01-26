console.log(1);
const p = new Promise((resolve) => {
  resolve(3);
}).then((d) => {
  console.log(d);
});
console.log(2);
