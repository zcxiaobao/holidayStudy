let p5 = new Promise((resolve) => resolve(1));
p5 = p5.then(() => p5);
console.log(p5);

let p6 = new Promise((resolve) => resolve()).then(() => p6);
console.log(p6);
