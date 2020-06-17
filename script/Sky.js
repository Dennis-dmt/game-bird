const skyDom = document.getElementsByClassName('sky')[0];
const skyW = skyDom.offsetWidth;
const skyH = skyDom.offsetHeight;

class Sky extends Rectangle {
  constructor() {
    super(skyW, skyH, 0, 0, -100, 0, skyDom)
  }
  // 天空的边界判断
  onMove() {
    if (this.left <= -skyW / 2) {
      this.left = 0
    }
  }
}

// let sky = new Sky()

// setInterval(() => {
//   // 调用父类的move方法
//   sky.move(16 / 1000)
// }, 16);