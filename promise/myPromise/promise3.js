// promise 三种状态
// 状态只能由 PENDING -> FULFILLED/REJECTED
// 异步调用
// 链式调用

const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class Promise {
  constructor(executor) {
    this.value = undefined;
    this.reason = undefined;
    this.status = PENDING;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    // this指向问题
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.value = value;
        this.status = FULFILLED;
        this.onFulfilledCallbacks.forEach((cb) => cb(this.value));
      }
    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
        this.onRejectedCallbacks.forEach((cb) => cb(this.reason));
      }
    };
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  then(onFulfilled, onRejected) {
    let p1 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        let x = onFulfilled(this.value);
        resolve(x);
      }
      if (this.status === REJECTED) {
        let x = onRejected(this.reason);
        resolve(x);
      }
      if (this.status === PENDING) {
        // 添加订阅
        this.onFulfilledCallbacks.push(() => {
          let x = onFulfilled(this.value);
          resolve(x);
        });
        this.onRejectedCallbacks.push(() => {
          let x = onRejected(this.reason);
          resolve(x);
        });
      }
    });
    return p1;
  }
}

module.exports = Promise;
