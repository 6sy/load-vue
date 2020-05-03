<template>
  <div>
    <canvas id='canvas'
            width="550"
            height='500'></canvas>
  </div>
</template>
<script>
function Ball (width, height, radius, color, ctx) {
  this.width = width
  this.height = height
  this.radius = radius
  this.color = color
  this.timer = null
  this.ctx = ctx
  this.end1 = null
  this.end2 = null
  this.center = null
}
Ball.prototype.creat = function () {
  this.ctx.beginPath()
  this.ctx.fillStyle = this.color
  this.ctx.arc(this.width, this.height, this.radius, 0, Math.PI * 2)
  this.ctx.fill()
}
Ball.run = function (ballOne, ballTwo, direction) {
  if (direction === 'right') {
    ballOne.end1 = ballOne.width + 110
    ballTwo.end2 = ballOne.width - 110
    ballTwo.center = ballOne.width + 55
    ballOne.timer = setInterval(Ball.moveRight.bind(null, ballOne, ballTwo), 1000 / 60)
  } else {
    ballOne.end1 = ballOne.width - 110
    ballTwo.end2 = ballTwo.width + 110
    ballTwo.center = ballTwo.width + 55
    ballOne.timer = setInterval(Ball.moveLeft.bind(null, ballOne, ballTwo), 1000 / 60)
  }
}
Ball.moveRight = function (ballOne, ballTwo) {
  ballOne.ctx.clearRect(ballOne.end1 - 145, 0, 190, 500)
  ballOne.width += 5
  ballTwo.width -= 5
  ballTwo.ctx.beginPath()
  ballOne.ctx.arc(ballOne.width, ballOne.height, ballOne.radius, 0, Math.PI * 2)
  ballTwo.ctx.arc(ballTwo.width, ballTwo.height - height(ballTwo.width, ballTwo.center), ballTwo.radius, 0, Math.PI * 2)
  ballTwo.ctx.fill()
  if (ballOne.width === ballOne.end1) {
    window.clearInterval(ballOne.timer)
  }
  console.log(ballOne.width, ballTwo.width)
}
Ball.moveLeft = function (ballOne, ballTwo) {
  ballOne.ctx.clearRect(ballTwo.end2 - 145, 0, 190, 500)
  ballOne.width -= 5
  ballTwo.width += 5
  ballTwo.ctx.beginPath()
  ballOne.ctx.arc(ballOne.width, ballOne.height, ballOne.radius, 0, Math.PI * 2)
  ballTwo.ctx.arc(ballTwo.width, ballTwo.height + height(ballTwo.width, ballTwo.center), ballTwo.radius, 0, Math.PI * 2)
  ballTwo.ctx.fill()
  if (ballOne.width === ballOne.end1) {
    window.clearInterval(ballOne.timer)
  }
}
function height (width, center) {
  return Math.sqrt(55 * 55 - (width - center) * (width - center))
}
export default {
  data () {
    return {

    }
  },
  prop: {

  },
  created () {

  },
  mounted () {
    const ctx = document.getElementById('canvas').getContext('2d')
    this.show(ctx)
  },
  methods: {
    show (ctx) {
      const ball1 = new Ball(50, 250, 25, 'red', ctx)
      ball1.creat()
      const ball2 = new Ball(160, 250, 25, 'red', ctx)
      ball2.creat()
      const ball3 = new Ball(270, 250, 25, 'red', ctx)
      ball3.creat()
      const ball4 = new Ball(380, 250, 25, 'red', ctx)
      ball4.creat()
      const ball5 = new Ball(490, 250, 25, 'red', ctx)
      ball5.creat()
      // setInterval(this.run.bind(null, ball1, ball2, ball3, ball4, ball5), 10000)

      // Ball.run(ball3, ball4, 'right')
      // Ball.run(ball4, ball5, 'right')
      this.run(ball1, ball2, ball3, ball4, ball5)
      // this.run.bind(null, ball1, ball2, ball3, ball4, ball5)
      setInterval(this.run.bind(null, ball1, ball2, ball3, ball4, ball5), 2840)
    },
    run (ball1, ball2, ball3, ball4, ball5) {
      Ball.run(ball1, ball2, 'right')
      // setTimeout(Ball.run.bind(null, ball1, ball2, 'right'), 0)
      setTimeout(Ball.run.bind(null, ball1, ball3, 'right'), 355)
      setTimeout(Ball.run.bind(null, ball1, ball4, 'right'), 710)
      setTimeout(Ball.run.bind(null, ball1, ball5, 'right'), 1065)
      setTimeout(Ball.run.bind(null, ball1, ball5, 'left'), 1420)
      setTimeout(Ball.run.bind(null, ball1, ball4, 'left'), 1775)
      setTimeout(Ball.run.bind(null, ball1, ball3, 'left'), 2130)
      setTimeout(Ball.run.bind(null, ball1, ball2, 'left'), 2485)
    },
    test () {
      console.log(1)
    }
  }
}
</script>
<style>
#canvas {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid black;
  box-sizing: border-box;
}
</style>
