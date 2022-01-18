## Promises/A+
promise 表示一个异步操作的最终结果。使用promise最主要的方式是通过then方法，then方法注册一个回调函数，这个回调函数接收promise最终成功结果或者为什么promise失败的原因。

这个规范详细的说明了then方法的行为，提供了一个可交互操作的基础，所有按照 Promises/A+ 规范promise实现都依赖于这个基础。因此，这个规范是十分稳定的。尽管Promises/A+组织可能偶尔会进行少量向后兼容的更改来修订规范，以解决新发现的边缘情况。但只有经过仔细考虑、讨论和测试之后，我们才会把大型或向后不兼容的更改整合到规范中。

从历史上看，Promises/A+规范使早期Promises/A提案中的行为条款更加清晰易懂，**将其扩展到事实上的行为**，并省略了未明确说明或有问题的部分。

最终，Promises/A+规范并不处理如何创建、实现或拒绝promise，而是选择专注于提供一个可交互操作的then方法。未来在配套规范中可能涉及这些主题。

## 1.Terminology(术语)
1. promise: promise 是一个带有then方法，遵循 Promise/A+ 规范的对象或函数
2. thenable: thenable是一个定义then方法的对象或者函数
3. value: value是任何合法的JavaScript值(including undefined , a thenable, or a promise)
4. exception: exception 是使用 throw 抛出的异常值
5. reason: 指明promise为什么被拒绝
## 2.Requirements(必要条件)
### 2.1 promise State(promise 状态)
promise必须是三种状态之一: 等待态(pending)、成功态(fulfilled)、失败态(rejected)

+ 当promise处于等待态(pending)时:
   + 可能转变为成功态(fulfilled)或失败态(rejected)
+ 当promise处于成功态(fulfilled)
  + 状态不能发生变化
  + 存有一个不能改变的值
+ 当promise处于失败态(rejected)
  + 状态不能发生变化
  + 存有一个不能改变的值(原因)

这里提到的不能发生改变意味着不变的身份。
> 这里有点难以理解，其实就类似于const声明的变量，如果变量是普通类型，变量就不可以改变；但如果是引用类型，那变量地址不可以发生改变。

### 2.2 then 方法
promise必须提供一个then方法来接收当前或最终的值或原因。

promise then方法接受两个参数：
```
promise.then(onFulfilled, onRejected)
```
+ onFulfilled 和 onRejected 都是可选项
  + 如果 onFulfilled 不是函数，会被忽略掉
  + 如果 onRejected 不是函数，会被忽略掉
+ 如果 onFulfilled 是函数
  + 当promise转变为成功态后，onFulfilled函数执行，promise的值作为其第一个参数
  + 它一定不能在promise转变为成功态前执行
  + 它一定不能被执行多次

+ 如果 onFulfilled 是函数
  + 当promise转变为**失败态**后，onFulfilled函数执行，promise的原因作为其第一个参数
  + 它一定不能在promise转变为失败态前执行
  + 它一定不能被执行多次
+ 在执行上下文栈只包含**平台代码**之前，onFulfilled 和 onRejected 一定不能被执行
+ onFulfilled 和 onRejected 一定要当作函数执行
+ 在同一个 promise 中， then 有可能被**调用**多次
  + 当promise转变为成功态时，所有对应的 onFulfilled 回调函数必须按照原始调用then的顺序执行
  + 当promise转变为失败态时，所有对应的 onRejected 回调函数必须按照原始调用then的顺序执行

```js
const p = new Promise((resolve)=> {
    setTimeout(()=> {
        resolve(1)
    })
})
p.then((res)=> {
    console.log(res)
})
p.then((res)=> {
    console.log(res+1)
})
```
+ then 必须返回一个新的 promise
```js
promise2 = promise1.then(onFulfilled, onRejected);
```
  + 如果 onFulfilled 或 onRejected 返回值x，调用promise执行程序 [[Resolve]](promise2, x)
  + 如果 onFulfilled 或 onRejected 抛出异常，promise2 执行reject转变至失败态，原因为e
  + 如果 onFulfilled 不是函数且 promise1 状态为成功态，promise2 的值与promise1相同，并且也会转变为成功态，
  + 如果 onRejected 不是函数且 promise1 状态为失败态，promise2 的原因与promise1相同，并且也会转变为失败态，