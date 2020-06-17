const landDom = document.getElementsByClassName('land')[0];
const landW = landDom.offsetWidth;
const landH = landDom.offsetHeight;
const landT = landDom.offsetTop

class Land extends Rectangle {
  constructor(speed) {
    super(landW, landH, 0, landT, speed, 0, landDom)
  }
  // 天空的边界判断
  onMove() {
    if (this.left <= -landW / 2) {
      this.left = 0
    }
  }
}

// let land = new Land(-100)

// setInterval(() => {
//   land.move(16 / 1000)
// }, 16);