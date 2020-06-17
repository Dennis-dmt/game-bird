class Game {
  constructor() {
    this.sky = new Sky();
    this.land = new Land(-100);
    this.bird = new Bird(1500);
    // 水管对生成器
    this.pipeProducer = new PipePareProducer(-100);
    this.timer = null;
    this.tick = 16;
    this.gameOver = false;
    this.score = 0; // 比分
    this.scoreDom = document.querySelector('.game .score span')
    this.overDom = document.querySelector('.game .game_over')
    this.regEvent()
  }
  start() {
    const duration = this.tick / 1000;
    if (this.timer) return;

    if (this.gameOver) {
      // 重新开始游戏
      window.location.reload()
    }

    this.pipeProducer.start()
    this.timer = setInterval(() => {
      this.land.move(duration)
      this.sky.move(duration)
      this.bird.move(duration)
      this.pipeProducer.arrs.forEach((pare) => {
        pare.move(duration)
      })

      if (this.isOver()) {
        this.stop();
        this.gameOver = true;
        this.overDom.classList.add('show')
        console.log('game over')
      }


    }, this.tick);
  }

  isOver() {
    console.log(111, this.pipeProducer.arrs)
    // 鸟碰到了大地
    if (this.bird.top >= this.bird.maxY) return true;

    // 鸟碰到水管
    for (let i = 0; i < this.pipeProducer.arrs.length; i++) {
      const pipes = this.pipeProducer.arrs[i];
      // 看鸟是否跟一对水管产生碰撞
      if (this.isHit(this.bird, pipes.upPipe) || this.isHit(this.bird, pipes.downPipe)) {
        return true
      }

      // 计分逻：给水管添加一个ckeck标签，如果小鸟的left>水管的left+水管的width，
      // 表示小鸟正好飞过该水管，此时给check=true，下次循环不在对此检测
      if (!pipes.upPipe.isChecked) {
        if (this.bird.left >= pipes.upPipe.left + pipes.upPipe.width) {
          pipes.upPipe.isChecked = true;
          // console.log('pipes.isChecked', pipes.upPipe);
          // console.log('bird cross successs');
          this.score += 10;
          this.scoreDom.innerText = this.score;
        }
      }
    }
    return false;
  }

  /**
   * 判断2个矩形是否碰撞
   * @param {*} origin 
   * @param {*} target 
   */
  isHit(origin, target) {
    // 碰撞检测思路：
    // 横向：两个矩形的中心点的横向距离，是否小于矩形宽度之和的一半
    // 纵向：两个矩形的中心点的纵向距离，是否小于矩形高度之和的一半
    var centerX1 = origin.left + origin.width / 2;
    var centerY1 = origin.top + origin.height / 2;
    var centerX2 = target.left + target.width / 2;
    var centerY2 = target.top + target.height / 2;
    var disX = Math.abs(centerX1 - centerX2); //中心点横向距离
    var disY = Math.abs(centerY1 - centerY2);//中心点总想距离
    if (disX < (origin.width + target.width) / 2 &&
      disY < (origin.height + target.height) / 2
    ) {
      return true;
    }
    return false;
  }

  stop() {
    clearInterval(this.timer);
    this.timer = null;
    this.bird.stopSwing()
    this.pipeProducer.stop()
  }

  // 绑定键盘事件
  regEvent() {
    window.onkeydown = (e) => {
      if (e.key === 'Enter') {
        this.timer ? this.stop() : this.start()
      }

      if (e.key === ' ') {
        this.bird.jump()
      }
    }
  }
}

let game = new Game()