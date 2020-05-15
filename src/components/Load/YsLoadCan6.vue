<template>
  <div>
    <div class='views'
         v-if='isShow'
         :style='{background:background}'>
      <canvas id='canvas'
              :width="500* this.size"
              :height='500* this.size'></canvas>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ctx: '',
      // 移动的第一个点
      firstDot: 150,
      // 移动的第二个点
      secondDot: 350,
      // 一个点的速度
      stepFirst: 0,
      // 第二个点的速度
      stepSecond: 0,
      // ball角度
      stepBall: 0,
      // spped ball
      speedBall: 0.75,
      ballX: 100,
      ballY: 250

    }
  },
  props: {
    size: {
      type: Number,
      default: 1
    },
    // 半径
    radius: {
      type: Number,
      default: 150
    },
    isShow: {
      type: Boolean,
      default: false
    },
    step: {
      type: Number,
      default: 2.5
    },
    background: {
      type: String,
      default: 'rgba(0, 0, 0,0.1)'
    }
  },
  created () {
    this.stepFirst = this.step
    this.stepSecond = this.step
  },
  mounted () {
  },
  watch: {
    isShow (val) {
      if (val === true) {
        this.$nextTick(function () {
          const ctx = document.getElementById('canvas').getContext('2d')
          this.ctx = ctx
          this.runFun = this.rectLeft
          this.ballRun = this.ballOne
          window.requestAnimationFrame(this.show)
        })
      }
    }
  },
  methods: {
    show () {
      this.ctx.clearRect(0, 0, 500 * this.size, 500 * this.size)
      // 位移
      this.firstDot += this.stepFirst
      this.secondDot += this.stepSecond
      // 画矩形
      this.rect()
      // 画圆球
      this.ball()
      window.requestAnimationFrame(this.show)
    },
    // 矩形
    // 四种状态
    rect () {
      this.ctx.lineWidth = 15
      this.ctx.lineCap = 'round'
      this.ctx.lineJoin = 'round'
      this.ctx.beginPath()
      this.runFun()
      this.ctx.stroke()
    },
    // 中间执行函数
    runFun () {

    },
    // left
    rectLeft () {
      this.ctx.moveTo(100, this.secondDot)
      this.ctx.lineTo(100, 400)
      this.ctx.lineTo(400, 400)
      this.ctx.lineTo(400, 100)
      this.ctx.lineTo(100, 100)
      this.ctx.lineTo(100, this.firstDot)
      if (this.secondDot === 400) {
        this.runFun = this.rectLeft1
        this.secondDot = 100
      }
    },
    rectLeft1 () {
      this.ctx.moveTo(this.secondDot, 400)
      this.ctx.lineTo(400, 400)
      this.ctx.lineTo(400, 100)
      this.ctx.lineTo(100, 100)
      this.ctx.lineTo(100, this.firstDot)
      if (this.firstDot === 400) {
        this.runFun = this.rectBottom
        this.firstDot = 100
      }
    },
    rectBottom () {
      this.ctx.moveTo(this.secondDot, 400)
      this.ctx.lineTo(400, 400)
      this.ctx.lineTo(400, 100)
      this.ctx.lineTo(100, 100)
      this.ctx.lineTo(100, 400)
      this.ctx.lineTo(this.firstDot, 400)
      if (this.secondDot === 400) {
        this.runFun = this.rectBottom1
        this.secondDot = 400
        this.stepSecond = -this.stepSecond
      }
    },
    rectBottom1 () {
      this.ctx.moveTo(400, this.secondDot)
      this.ctx.lineTo(400, 100)
      this.ctx.lineTo(100, 100)
      this.ctx.lineTo(100, 400)
      this.ctx.lineTo(this.firstDot, 400)
      if (this.firstDot === 400) {
        this.runFun = this.rectRight
        this.firstDot = 400
        this.stepFirst = -this.stepFirst
      }
    },
    rectRight () {
      this.ctx.moveTo(400, this.secondDot)
      this.ctx.lineTo(400, 100)
      this.ctx.lineTo(100, 100)
      this.ctx.lineTo(100, 400)
      this.ctx.lineTo(400, 400)
      this.ctx.lineTo(400, this.firstDot)
      if (this.secondDot === 100) {
        this.runFun = this.rectRight1
        this.secondDot = 400
      }
    },
    rectRight1 () {
      this.ctx.moveTo(this.secondDot, 100)
      this.ctx.lineTo(100, 100)
      this.ctx.lineTo(100, 400)
      this.ctx.lineTo(400, 400)
      this.ctx.lineTo(400, this.firstDot)
      if (this.firstDot === 100) {
        this.runFun = this.rectTop
        this.firstDot = 400
      }
    },
    rectTop () {
      this.ctx.moveTo(this.secondDot, 100)
      this.ctx.lineTo(100, 100)
      this.ctx.lineTo(100, 400)
      this.ctx.lineTo(400, 400)
      this.ctx.lineTo(400, 100)
      this.ctx.lineTo(this.firstDot, 100)
      if (this.secondDot === 100) {
        this.runFun = this.rectTop1
        this.secondDot = 100
        this.stepSecond = -this.stepSecond
      }
    },
    rectTop1 () {
      this.ctx.moveTo(100, this.secondDot)
      this.ctx.lineTo(100, 400)
      this.ctx.lineTo(400, 400)
      this.ctx.lineTo(400, 100)
      this.ctx.lineTo(this.firstDot, 100)
      if (this.firstDot === 100) {
        this.runFun = this.rectLeft
        this.firstDot = 100
        this.stepFirst = -this.stepFirst
      }
    },
    ball () {
      this.ctx.beginPath()
      this.stepBall += this.speedBall
      this.ballRun()
      this.ctx.arc(this.ballX, this.ballY, 10, 0, 2 * Math.PI)
      this.ctx.fill()
    },
    ballRun () {

    },
    ballOne () {
      const x = Math.cos(this.stepBall * 2 * Math.PI / 360) * this.radius
      this.ballX = 100 + 150 - x
      this.ballY = Math.sqrt(150 * 150 - (250 - this.ballX) * (250 - this.ballX)) + 250
      if (this.stepBall === 90) {
        this.ballRun = this.ballTow
      }
    },
    ballTow () {
      const x = Math.sin(-Math.PI / 2 + this.stepBall * 2 * Math.PI / 360) * this.radius
      this.ballX = x + 250
      this.ballY = Math.sqrt(150 * 150 - (-250 + this.ballX) * (-250 + this.ballX)) + 250
      if (this.stepBall === 180) {
        this.ballRun = this.ballThree
      }
    },
    ballThree () {
      const x = Math.cos(-Math.PI + this.stepBall * 2 * Math.PI / 360) * this.radius
      this.ballX = x + 250
      this.ballY = -Math.sqrt(150 * 150 - (-250 + this.ballX) * (-250 + this.ballX)) + 250
      if (this.stepBall === 270) {
        this.ballRun = this.ballFour
      }
    },
    ballFour () {
      const x = Math.sin(-1.5 * Math.PI + this.stepBall * 2 * Math.PI / 360) * this.radius
      this.ballX = 250 - x
      this.ballY = -Math.sqrt(150 * 150 - (250 - this.ballX) * (250 - this.ballX)) + 250
      if (this.stepBall === 360) {
        this.ballRun = this.ballOne
        this.stepBall = 0
      }
    },
    startLoad () {
      this.isShow = true
    }
  }
}
</script>
<style>
.views {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
#canvas {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid black;
  box-sizing: border-box;
}
</style>
