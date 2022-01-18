## error1: this指向丢失

```js
const resolve = function (value) {
    if (this.status === PENDING) {
    this.value = value;
    this.status = FULFILLED;
    }
};
```

## error2: 抛出异常
```js
new Promise((resolve, reject) => {
  throw new Error("error");
});
new Promise((resolve, reject) => {
  return new Error("error");
});
```

## 异步函数回调中的异常，Promise不会理会