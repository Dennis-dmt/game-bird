const gameW = document.querySelector('.game').clientWidth;
const gameDom = document.querySelector('.game')

// 单根水管
class Pipe extends Rectangle {
  constructor(height, top, speed, dom) {
    super(52, height, gameW, top, speed, 0, dom)
    this.isChecked = false;
  }
  // 水管边界，判断left值为-自己的宽度，删除
  onMove() {
    if (this.left < -this.width) {
      // 移除dom
      this.dom.remove()
    }
  }
}

function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

// 水管对类
class PipePare {
  constructor(speed) {
    this.spaceHeight = 150; // 2水管间空隙高度
    this.minHeight = 80;  // 水管最小高度
    this.maxHeight = landT - this.spaceHeight - this.minHeight; // 水管最大高度

    const upHeight = getRandom(this.minHeight, this.maxHeight) // 上水管高度
    const downHeight = landT - this.spaceHeight - upHeight // 下水管高度

    const upDom = document.createElement('div')
    upDom.className = 'pipe up'
    gameDom.appendChild(upDom)
    this.upPipe = new Pipe(upHeight, 0, speed, upDom) // 上水管

    const downDom = document.createElement('div')
    downDom.className = 'pipe down'
    gameDom.appendChild(downDom)
    const downTop = landT - downHeight
    this.downPipe = new Pipe(downHeight, downTop, speed, downDom) // 下水管
  }
  // 该水管对是否已经移除的视野
  get useless() {
    return this.upPipe.left < -this.upPipe.width;
  }

  move(duration) {
    this.upPipe.move(duration);
    this.downPipe.move(duration);
  }
}

// 不断产生水管对类
class PipePareProducer {
  constructor(speed) {
    this.speed = speed;
    this.arrs = []; // 装水管对类的容器
    this.timer = null;
  }

  // 开始产生水管对类
  start() {
    if (this.timer) return;
    // 游戏开始的时候创建一个水管类，之后间隔1.5s创建水管类
    this.arrs.push(new PipePare(this.speed))
    this.timer = setInterval(() => {
      this.arrs.push(new PipePare(this.speed))
      // 移除用不掉的水管对
      for (let i = 0; i < this.arrs.length; i++) {
        if (this.arrs[i].useless) {
          // 没有用的水管类对
          this.arrs.splice(i, 1)
          i--;
        }
      }
    }, 1500)
  }
  // 停止
  stop() {
    clearInterval(this.timer);
    this.timer = null;
  }

}


// let producer = new PipePareProducer(-100);
// producer.start()

// setInterval(() => {
//   producer.arrs.forEach((pare) => {
//     pare.move(16 / 1000)
//   })
// }, 16)
