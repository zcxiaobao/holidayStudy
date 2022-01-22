
## 前言
观察者模式和发布订阅模式作为日常开发中经常使用到的模式，小包一直不能做到很好的区分，前几天在听手写 `promise` 源码时，老师详细的讲解了两种模式，发现自己还是很难吃透。

赶得早不如赶得巧，最近小包正好在使用武侠风解读`JavaScript` ，武侠世界真的可以赋予 `JavaScript` 不一样的魅力，下面就来看一下小包如何用武侠理解设计模式，并附带几个现实案例，助你彻底理解观察者模式与发布订阅模式。

## 故事背景
前端宗门自从发布了传承方案后，宗门日渐繁荣，弟子们的水平不断提高，但新的问题出现了——高质量任务严重不足。宗门任务大殿每个月发布的五星任务是有限的，想要接取五星任务的弟子却如过江之鲫，于是滋生了**武侠黄牛**，恶意抢任务，坐地起价。

宗门不愿任务被恶意哄抢，决定调整任务市场秩序，因此推出任务订阅功能——观察者模式。

## 观察者模式

任务订阅的大致功能是这样的: 宗门推出五星任务订阅功能，弟子通过购买获得订阅权限，当宗门发布五星任务后，会通知拥有订阅权限的弟子。

那么任务订阅功能中有两类主体:

+ 宗门任务大殿
  + 维护拥有订阅权限的弟子列表
  + 提供弟子购买订阅权限的功能
  + 发布对应任务后通知有订阅权限的弟子
+ 接受任务通知的弟子们

上面宗门任务大殿与弟子间的关系其实就构成了一个观察者模式。

**那什么是观察者模式那？** 当对象之间存在一对多的依赖关系时，其中一个对象的状态发生改变，所有依赖它的对象都会收到通知，这就是观察者模式。

在观察者模式中，只有两种主体：目标对象 (`Object`) 和 观察者 (`Observer`)。宗门任务大殿就是目标对象，弟子们就是观察者。
+ 目标对象 `Subject`:
  + 维护观察者列表 `observerList` ———— 维护拥有订阅权限的弟子列表
  + 定义添加观察者的方法 ———— 提供弟子购买订阅权限的功能
  + 当自身发生变化后，通过调用自己的 `notify` 方法依次通知每个观察者执行 `update` 方法 ———— 发布对应任务后通知有订阅权限的弟子
+ 观察者 `Observer` 需要实现 `update` 方法，供目标对象调用。`update`方法中可以执行自定义的业务逻辑 ———— 弟子们需要定义接收任务通知后的方法，例如去抢任务或任务不适合，继续等待下一个任务

我们把上面的文字形象化一下:


![Observer.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f96a826bb7945dd96f9696f41b45534~tplv-k3u1fbpfcp-watermark.image?)

```js
class Observer {
    constructor(name) {
        this.name = name;
    }
    update({taskType, taskInfo}) {
        // 假设任务分为日常route和战斗war
        if (taskType === "route") {
            console.log(`${this.name}不需要日常任务`);
            return;
        }
        this.goToTaskHome(taskInfo);
        
    }
    goToTaskHome(info) {
        console.log(`${this.name}去任务大殿抢${info}任务`);
    }
}

class Subject {
    constructor() {
        this.observerList = []
    }
    addObserver(observer) {
        this.observerList.push(observer);
    }
    notify(task) {
        console.log("发布五星任务");
        this.observerList.forEach(observer => observer.update(task))
    }
}

const subject = new Subject();
const stu1 = new Observer("弟子1");
const stu2 = new Observer("弟子2");

// stu1 stu2 购买五星任务通知权限
subject.addObserver(stu1);
subject.addObserver(stu2);

// 任务殿发布五星战斗任务
const warTask = {
    taskType: 'war',
    taskInfo: "猎杀时刻"
}

// 任务大殿通知购买权限弟子
subject.notify(warTask);

// 任务殿发布五星日常任务
const routeTask = {
    taskType: 'route',
    taskInfo: "种树浇水"
}

subject.notify(warTask);

```

输出结果:
```js
// 战斗任务
发布五星任务
弟子1去任务大殿抢猎杀时刻任务
弟子2去任务大殿抢猎杀时刻任务

// 日常任务
发布五星任务
弟子1去任务大殿抢猎杀时刻任务
弟子2去任务大殿抢猎杀时刻任务
```

通过上面代码我们可以看到，当宗门发布任务后，订阅的弟子(观察者们)都会收到任务最新通知。

看到这里，不知道你可以理解观察者模式了？

**小包再给举个栗子**: 比如你要应聘阿里巴巴的前端工程师，结果阿里巴巴 HR 告诉你没坑位了，留下你的电话，等有坑位联系你。于是，你美滋滋的留下了联系方式。殊不知，HR 已经留下了好多联系方式。好在 2022 年 2 月 30 号那天，阿里巴巴有了前端工程师的坑位，HR 挨着给留下的联系方式联系了一通。

案例中阿里巴巴就是目标对象 `Subject` ，联系方式列表就是用来维护观察者的 `observerList` ，根据前端职位的有无来调用 `notify` 方法。

## 发布订阅模式
**那什么是发布订阅模式那？** 基于一个事件（主题）通道，希望接收通知的对象 `Subscriber` 通过自定义事件订阅主题，被激活事件的对象 `Publisher` 通过发布主题事件的方式通知各个订阅该主题的 `Subscriber` 对象。

因此发布订阅模式与观察者模式相比，发布订阅模式中有三个角色，发布者 `Publisher` ，事件调度中心 `Event Channel` ，订阅者 `Subscriber` 。

上面的文字有些难以理解，我们继续以弟子领取任务为栗子，宗门感觉把任务订阅放在任务大殿中有些繁琐，于是决定在任务大殿和弟子中间添加**中介**。弟子在中介中订阅其需要的任务类型，当任务大殿发布任务后，中介会将发布任务给对应的订阅者。
+ 宗门任务大殿: 任务发布者 —— `Publisher`
+ 中介功能 —— `Event Channel`
    + 维护任务类型，以及每种任务下的订阅情况
    + 给订阅者提供订阅功能 —— `subscribe` 功能
    + 当宗门发布任务后，中介会给所有的订阅者发布任务 —— `publish` 功能
+ 弟子: 任务接受者 —— `Subscriber`


![publish-subscribe.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8fc5d255760a4192a939785e427fabec~tplv-k3u1fbpfcp-watermark.image?)

**小包再给大家举个例子**: 以目前的**热播剧开端**为例，临近过年，摸鱼的心思越来越重，每天就迫不及待的等开端更新，想在开端更新的第一刻就开始看剧，那你会怎么做那？总不能时时刻刻刷新页面吧。平台提供了消息订阅功能，如果你选择订阅，平台更新开端后，会第一时间发消息通知你，订阅后，你就可以愉快的追剧了。

上面案例中，开端就是发布者 `Publisher`，追剧人就是订阅者 `Subscribe`，平台则承担了事件通道 `Event Channel` 功能。

```js
class PubSub {
    constructor() {
        // 事件中心
        // 存储格式: warTask: [], routeTask: []
        // 每种事件(任务)下存放其订阅者的回调函数
        this.events = {}
    }
    // 订阅方法
    subscribe(type, cb) {
        if (!this.events[type]) {
            this.events[type] = [];
        }
        this.events[type].push(cb);
    }
    // 发布方法
    publish(type, ...args) {
        if (this.events[type]) {
            this.events[type].forEach(cb => cb(...args))
        }
    }
    // 取消订阅方法
    unsubscribe(type, cb) {
        if (this.events[type]) {
            const cbIndex = this.events[type].findIndex(e=> e === cb)
            if (cbIndex != -1) {
                this.events[type].splice(cbIndex, 1);
            }
        }
        if (this.events[type].length === 0) {
            delete this.events[type];
        }
    }
    unsubscribeAll(type) {
        if (this.events[type]) {
            delete this.events[type];
        }
    }
}

// 创建一个中介公司
let pubsub = new PubSub();

// 弟子一订阅战斗任务
pubsub.subscribe('warTask', function (taskInfo){
    console.log("宗门殿发布战斗任务，任务信息:" + taskInfo);
})
// 弟子一订阅战斗任务
pubsub.subscribe('routeTask', function (taskInfo) {
    console.log("宗门殿发布日常任务，任务信息:" + taskInfo);
});
// 弟子三订阅全类型任务
pubsub.subscribe('allTask', function (taskInfo) {
    console.log("宗门殿发布五星任务，任务信息:" + taskInfo);
});

// 发布战斗任务
pubsub.publish('warTask', "猎杀时刻");
pubsub.publish('allTask', "猎杀时刻");

// 发布日常任务
pubsub.publish('routeTask', "种树浇水");
pubsub.publish('allTask', "种树浇水");
```

输出结果:

```js
// 战斗任务
宗门殿发布战斗任务，任务信息:猎杀时刻
宗门殿发布五星任务，任务信息:猎杀时刻
// 日常任务
宗门殿发布日常任务，任务信息:种树浇水
宗门殿发布五星任务，任务信息:种树浇水
```
通过输出结果，我们可以发现发布者和订阅者不知道对方的存在。需要第三方中介，将订阅者和发布者串联起来，利用中介过滤和分配所有输入的消息。也就是说，**发布-订阅模式用来处理不同系统组件的信息交流，即使这些组件不知道对方的存在**。

## 总结
上文中提到了观察者模式和发布——订阅模式，我们来总结一下两者差异:

![observer-publish_subscribe.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/52a175a22ade4793a0297b18c5fb293d~tplv-k3u1fbpfcp-watermark.image?)

| 设计模式 | 观察者模式  | 发布订阅模式  |
| --- | --- | --- |
|  主体| Object观察者、Subject目标对象 | Publisher发布者、Event Channel事件中心、Subscribe订阅者|
| 主体关系| Subject中通过observerList记录ObServer | Publisher和Subscribe不想不知道对方，通过中介联系|
| 优点| 角色明确，Subject和Object要遵循约定的成员方法 | 松散耦合，灵活度高，通常应用在异步编程中 |
|缺点|紧耦合|当事件类型变多时，会增加维护成本|
|使用案例|双向数据绑定|事件总线EventBus|


