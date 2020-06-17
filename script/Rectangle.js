/**
 * 所有类的父类：矩形类
 * 参数：宽，高，横坐标，纵坐标，横向速度，纵向速度，传入的dom对象
 * speedX：横向速度，单位：？px/秒，正数：向右，负数：向左
 * speedY：纵向速度，单位：？px/秒，正数：向下，负数：向上
 */
class Rectangle {
  constructor(width, height, left, top, speedX, speedY, dom) {
    this.width = width;
    this.height = height;
    this.left = left;
    this.top = top;
    this.speedX = speedX;
    this.speedY = speedY;
    this.dom = dom;
    this.render();
  }

  render() {
    this.dom.style.width = this.width + "px";
    this.dom.style.height = this.height + "px";
    this.dom.style.left = this.left + "px";
    this.dom.style.top = this.top + "px";
  }

  /**
   * 按照矩形的速度，和指定的时间，移动矩形
   * @param {*} duration 单位：秒
   */
  move(duration) {
    const disX = this.speedX * duration;
    const disY = this.speedY * duration;
    this.left += disX;
    this.top += disY;

    // move的时候触发实例原型里面的onMove方法，从而进行天空边界判断
    if (this.onMove) { // 这里的this指向调用move的实例对象
      //每次移动后，渲染前，均会调用该方法
      this.onMove()
    }
    this.render(); //重新渲染
  }
}