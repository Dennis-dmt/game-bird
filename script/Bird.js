const birdDom = document.getElementsByClassName('bird')[0];
const birdW = birdDom.offsetWidth;
const birdH = birdDom.offsetHeight;
const birdT = birdDom.offsetTop;
const birdL = birdDom.offsetLeft;
const gameH = document.querySelector('.game').clientHeight;

// 小鸟类
class Bird extends Rectangle {
  constructor(g) {
    // 小鸟只有纵向的速度，而且一开始速度是0，并且有自己的加速度
    super(birdW, birdH, birdT, birdL, 0, 0, birdDom)
    this.g = g; // 向下加速度，单位：？px/秒²
    // 小鸟落地最大的top值，游戏高度-land高度-小鸟高度
    this.maxY = gameH - landH - birdH;
    // 小鸟目前翅膀状态，对应className的swing1
    this.swingStatus = 1;
    this.timer = null; // 小鸟翅膀计时器
  }

  move(duration) {
    // 调用父类方法
    super.move(duration)
    // 根据加速改变小鸟纵向速度
    this.speedY += this.g * duration

    this.startSwing()
  }

  // 小鸟top边界判断
  onMove() {
    if (this.top < 0) {
      this.top = 0;
    } else if (this.top > this.maxY) {
      this.top = this.maxY
    }
  }

  // 小鸟jump方法
  jump() {
    this.speedY = -450
  }

  // 开始煽动翅膀
  startSwing() {
    // 计时器已经有值就停止
    if (this.timer) return;
    this.timer = setInterval(() => {
      this.swingStatus++;
      if (this.swingStatus === 4) this.swingStatus = 1;
      this.dom.className = `bird swing${this.swingStatus}`
    }, 1);
  }

  // 停止煽动翅膀
  stopSwing() {
    clearInterval(this.timer)
    this.timer = null;
  }
}

// let bird = new Bird(1500)

// setInterval(() => {
//   bird.move(16 / 1000)
// }, 16);