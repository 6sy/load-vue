<template>
  <div class='views'
       :style='{background:background}'
       v-if='isShow'>
    <canvas id='canvas'
            width="500"
            height='500'></canvas>
  </div>
</template>
<script>
function SmallRing (begin, end, ctx) {
  this.begin = begin
  this.end = end
}
// 画环
SmallRing.prototype.active = function (ctx) {
  ctx.beginPath()
  ctx.lineWidth = window.localStorage.getItem('lineWidth')
  ctx.lineCap = 'round'
  ctx.arc(250, 250, window.localStorage.getItem('radius'), this.begin, this.end)
  ctx.stroke()
}
export default {
  data () {
    return {
      // 半弧开始结束位置
      ringBegin: 0.1,
      ringEnd: 1.1,
      // 第一个运动的环开始结束
      smallBegin1: -0.7,
      smallEnd1: -0.6,
      // 第二个
      smallBegin2: -0.2,
      smallEnd2: -0.1,
      // 速度记录
      i: 0,
      ctx: '',
      donghua: ''
    }
  },
  props: {
    // 半径
    radius: {
      type: Number,
      default: 100
    },
    // fast 快速  slow减速 constant匀速
    speed: {
      type: String,
      default: 'constant'
    },
    color: {
      type: Array,
      // default: ['rgb(255, 105, 180)', 'rgb(255,165,0)']
      default: function () {
        return ['rgb(255, 105, 180)', 'rgb(255,165,0)']
      }
    },
    isShow: {
      type: Boolean,
      default: false
    },
    lineWidth: {
      type: Number,
      default: 20
    },
    background: {
      type: String,
      default: 'rgba(0, 0, 0,0.1)'
    }
  },
  created () {
    // 缓存半径 线宽
    const radius = this.radius
    window.localStorage.setItem('radius', radius)
    const lineWidth = this.lineWidth
    window.localStorage.setItem('lineWidth', lineWidth)
  },
  watch: {
    isShow (val) {
      if (val === true) {
        this.$nextTick(() => {
          const ctx = document.getElementById('canvas').getContext('2d')
          this.ctx = ctx
          window.requestAnimationFrame(this.show)
        })
      }
      if (val === false) {
        window.cancelAnimationFrame(this.donghua)
      }
    }
  },
  methods: {
    // 动画执行函数
    show () {
      this.ctx.clearRect(0, 0, 500, 500)
      // 运动
      this.add()
      // 超过2就归0
      this.overflow()
      // 交接点处
      this.point()
      // 画半圆
      this.ring(this.ctx)
      // 画两个环
      this.smallRing(this.ctx)
      this.donghua = window.requestAnimationFrame(this.show)
    },
    ring (ctx) {
      ctx.beginPath()
      const gradient = ctx.createLinearGradient(150, 250, 350, 251)
      gradient.addColorStop(0, this.color[0])
      gradient.addColorStop(1, this.color[1])
      // 渐变描边
      ctx.strokeStyle = gradient
      ctx.lineWidth = localStorage.getItem('lineWidth')
      ctx.lineCap = 'round'
      ctx.arc(250, 250, localStorage.getItem('radius'), this.ringBegin * Math.PI, this.ringEnd * Math.PI)
      ctx.stroke()
    },
    /* eslint-disable no-new */
    smallRing (ctx) {
      const a = new SmallRing(this.smallBegin1 * Math.PI, this.smallEnd1 * Math.PI)
      const b = new SmallRing(this.smallBegin2 * Math.PI, this.smallEnd2 * Math.PI)
      a.active(ctx)
      b.active(ctx)
    },
    // add
    add () {
      this.smallBegin1 += this.sudu()
      this.smallEnd1 += this.sudu()
      this.smallBegin1 = Number(this.smallBegin1.toFixed(3))
      this.smallEnd1 = Number(this.smallEnd1.toFixed(3))
      this.smallBegin2 += this.sudu()
      this.smallEnd2 += this.sudu()
      this.smallBegin2 = Number(this.smallBegin2.toFixed(3))
      this.smallEnd2 = Number(this.smallEnd2.toFixed(3))
    },
    // 溢出    或许可以使用watch来观测 一个在增 一个再减
    overflow () {
      if (this.smallEnd1 === 2) {
        this.smallEnd1 = 0
      }
      if (this.smallBegin1 === 2) {
        this.smallBegin1 = 0
      }
      if (this.smallEnd2 === 2) {
        this.smallEnd1 = 0
      }
      if (this.smallBegin2 === 2) {
        this.smallBegin1 = 0
      }
      if (this.ringBegin === -2) {
        this.ringBegin = 0
      }
      if (this.ringEnd === -2) {
        this.ringEnd = 0
      }
    },
    // 交接点，重设坐标
    point () {
      if (this.smallEnd1 === this.ringBegin || this.smallEnd1 - this.ringBegin === 2) {
        this.smallBegin1 = this.ringEnd - (0.1)
        this.smallEnd1 = this.smallBegin1 + (0.1)
        this.ringBegin = (this.ringBegin - 0.1)
        this.ringEnd = (this.ringEnd - 0.1)
        this.ringBegin = Number((this.ringBegin).toFixed(3))
        this.ringEnd = Number((this.ringEnd).toFixed(3))
      }
      if (this.smallEnd2 === this.ringBegin || this.smallEnd2 - this.ringBegin === 2) {
        this.smallBegin2 = this.ringEnd - (0.1)
        this.smallEnd2 = this.smallBegin2 + (0.1)
        this.ringBegin = (this.ringBegin - 0.1)
        this.ringEnd = (this.ringEnd - 0.1)
        this.ringBegin = Number((this.ringBegin).toFixed(3))
        this.ringEnd = Number((this.ringEnd).toFixed(3))
      }
    },
    // sudu
    sudu () {
      const slow = 0.01
      const constant = 0.02
      const fast = 0.05
      if (this.speed === 'constant') {
        return constant
      } else if (this.speed === 'fast') {
        return fast
      } else if (this.speed === 'slow') {
        return slow
      }
    },
    // 编程式调用
    startLoad (obj) {
      this.fuzhi(obj)
      this.isShow = true
    },
    endLoad () {
      this.isShow = false
      cancelAnimationFrame(this.show)
    },
    fuzhi (obj) {
      if (!obj) return ''
      if (obj.radius) {
        window.localStorage.setItem('radius', obj.radius)
      }
      if (obj.speed) {
        this.speed = obj.speed
      }
      if (obj.background) {
        this.background = obj.background
      }
      if (obj.color) {
        this.color = obj.color
      }
      if (obj.lineWidth) {
        window.localStorage.setItem('lineWidth', obj.lineWidth)
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
  border: none !important;
}
</style>
