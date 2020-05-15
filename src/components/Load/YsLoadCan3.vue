<template>
  <div class='views'
       v-if='isShow'
       :style='{background:background}'>
    <canvas id='canvas'
            :width="550* this.size"
            :height='500* this.size'></canvas>
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
Ball.prototype.create = function () {
  this.ctx.beginPath()
  this.ctx.fillStyle = this.color
  this.ctx.arc(this.width, this.height, this.radius, 0, Math.PI * 2)
  this.ctx.fill()
}
export default {
  data () {
    return {
      ctx: '',
      ball1: {},
      ball2: {},
      ball3: {},
      ball4: {},
      ball5: {},
      position: 50,
      direction: '',
      donghua: ''
    }
  },
  props: {
    // 显示隐藏
    isShow: {
      type: Boolean,
      default: false
    },
    // 大小
    size: {
      type: Number,
      default: 0.5
    },
    // 速度
    step: {
      type: Number,
      default: 2.5
    },
    // 模式 shadow none
    pattern: {
      type: String,
      default: 'none'
    },
    // 小球颜色
    color: {
      type: Array,
      default () {
        return Array.from(Array(5), (item) => 'red')
      }
    },
    background: {
      type: String,
      default: 'rgba(0, 0, 0,0.1)'
    }
  },
  created () {
  },
  mounted () {

  },
  watch: {
    isShow (val) {
      if (val === true) {
        this.$nextTick(function () {
          const canvas = document.querySelector('#canvas')
          const ctx = canvas.getContext('2d')
          this.ctx = ctx
          this.ball1 = new Ball(50 * this.size, 250 * this.size, 25 * this.size, this.color[0], ctx)
          this.ball2 = new Ball(160 * this.size, 250 * this.size, 25 * this.size, this.color[1], ctx)
          this.ball3 = new Ball(270 * this.size, 250 * this.size, 25 * this.size, this.color[2], ctx)
          this.ball4 = new Ball(380 * this.size, 250 * this.size, 25 * this.size, this.color[3], ctx)
          this.ball5 = new Ball(490 * this.size, 250 * this.size, 25 * this.size, this.color[4], ctx)
          this.ball1.create()
          this.ball2.create()
          this.ball3.create()
          this.ball4.create()
          this.ball5.create()
          // this.ctx = ctx
          window.requestAnimationFrame(this.show)
        })
      } else {
        window.cancelAnimationFrame(this.donghua)
      }
    }
  },
  methods: {
    show () {
      // 清除模式
      if (this.pattern === 'none') {
        this.ctx.clearRect(0, 0, 550 * this.size, 500 * this.size)
      } else {
        this.ctx.fillStyle = 'rgba(255,255,255,0.1)'
        this.ctx.fillRect(0, 0, 550 * this.size, 500 * this.size)
      }
      this.run()
      this.donghua = window.requestAnimationFrame(this.show)
    },
    // 动画控制
    run () {
      if (this.ball1.width === 50 * this.size) {
        this.runNow = this.runOne
        this.direction = 'right'
      } else if (this.ball1.width === 160 * this.size && this.direction === 'right') {
        this.runNow = this.runTwo
      } else if (this.ball1.width === 270 * this.size && this.direction === 'right') {
        this.runNow = this.runThree
      } else if (this.ball1.width === 380 * this.size && this.direction === 'right') {
        this.runNow = this.runFour
      } else if (this.ball1.width === 490 * this.size) {
        this.runNow = this.runFive
        this.direction = 'left'
      } else if (this.ball1.width === 380 * this.size && this.direction === 'left') {
        this.runNow = this.runSix
      } else if (this.ball1.width === 270 * this.size && this.direction === 'left') {
        this.runNow = this.runSeven
      } else if (this.ball1.width === 160 * this.size && this.direction === 'left') {
        this.runNow = this.runEight
      }
      this.runNow()
    },
    // 中间函数
    runNow () {

    },
    runOne () {
      this.ball1.width += this.step
      this.ball2.width -= this.step
      this.ball2.height = 250 * this.size - this.height(this.ball2.width, 105 * this.size)
      this.ball1.create()
      this.ball2.create()
      this.ball3.create()
      this.ball4.create()
      this.ball5.create()
    },
    runTwo () {
      this.ball1.width += this.step
      this.ball3.width -= this.step
      this.ball3.height = 250 * this.size - this.height(this.ball3.width, 215 * this.size)
      this.ball1.create()
      this.ball2.create()
      this.ball3.create()
      this.ball4.create()
      this.ball5.create()
    },
    runThree () {
      this.ball1.width += this.step
      this.ball4.width -= this.step
      this.ball4.height = 250 * this.size - this.height(this.ball4.width, 325 * this.size)
      this.ball1.create()
      this.ball2.create()
      this.ball3.create()
      this.ball4.create()
      this.ball5.create()
    },
    runFour () {
      this.ball1.width += this.step
      this.ball5.width -= this.step
      this.ball5.height = 250 * this.size - this.height(this.ball5.width, 435 * this.size)
      this.ball1.create()
      this.ball2.create()
      this.ball3.create()
      this.ball4.create()
      this.ball5.create()
    },
    runFive () {
      this.ball1.width -= this.step
      this.ball5.width += this.step
      this.ball5.height = 250 * this.size + this.height(this.ball5.width, 435 * this.size)
      this.ball1.create()
      this.ball2.create()
      this.ball3.create()
      this.ball4.create()
      this.ball5.create()
    },
    runSix () {
      this.ball1.width -= this.step
      this.ball4.width += this.step
      this.ball4.height = 250 * this.size + this.height(this.ball4.width, 325 * this.size)
      this.ball1.create()
      this.ball2.create()
      this.ball3.create()
      this.ball4.create()
      this.ball5.create()
    },
    runSeven () {
      this.ball1.width -= this.step
      this.ball3.width += this.step
      this.ball3.height = 250 * this.size + this.height(this.ball3.width, 215 * this.size)
      this.ball1.create()
      this.ball2.create()
      this.ball3.create()
      this.ball4.create()
      this.ball5.create()
    },
    runEight () {
      this.ball1.width -= this.step
      this.ball2.width += this.step
      this.ball2.height = 250 * this.size + this.height(this.ball2.width, 105 * this.size)
      this.ball1.create()
      this.ball2.create()
      this.ball3.create()
      this.ball4.create()
      this.ball5.create()
    },
    // 高度差辅助函数
    height (width, center) {
      return Math.sqrt(55 * this.size * 55 * this.size - (width - center) * (width - center))
    },
    // start
    startLoad (obj) {
      this.isShow = true
      try {
        this.fuzhi(obj)
      } catch (e) {
        console.log(e)
      }
    },
    endLoad () {
      this.isShow = false
      cancelAnimationFrame(this.show)
    },
    fuzhi (obj) {
      if (obj === undefined) return ''
      if (obj.color) {
        this.color = obj.color
      }
      if (obj.pattern) {
        this.pattern = obj.pattern
      }
      if (obj.step && (obj.step === 1 || obj.step === 2.5 || obj.strp === 5)) {
        this.step = obj.step
      }
      if (obj.size) {
        this.size = obj.size
      }
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
