// const Promise = require("./myPromise/promise1");

// let p1 = new Promise((resolve, reject) => {
//   //   resolve(1);
//   throw new Error("error");
// });
// p1.then(
//   (res) => {
//     console.log(res);
//   },
//   (e) => {
//     console.log(e + "err");
//   }
// );

// 2--------
// const Promise = requisre("./myPromise/promise2");

// let p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // throw new Error("123");
//     resolve(1);
//   });
// });
// p1.then(
//   (res) => {
//     console.log(res + ":success");
//   },
//   (e) => {
//     console.log(e + ":err");
//   }
// );

// 3--------
const Promise = require("./myPromise/promise3");

let p1 = new Promise((resolve, reject) => {
  // throw new Error("123");
  resolve(1);
});
p1.then(
  (res) => {
    console.log(res + ":success");
    return 123;
  },
  (e) => {
    console.log(e + ":err");
  }
).then((res) => {
  console.log(res);
});
