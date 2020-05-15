<template>
  <div class='views'
       :style='{background:background}'
       v-if='isShow'>
    <canvas id='canvas'
            :width="500"
            :height='500'></canvas>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ctx: '',
      begin: -0.5,
      end: -0.5,
      donghua: ''
    }
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    background: {
      type: String,
      default: 'rgba(0, 0, 0,0.1)'
    },
    radius: {
      type: Number,
      default: 200
    },
    step: {
      type: Number,
      default: 0.02
    },
    lineWidth: {
      type: Number,
      default: 5
    },
    color: {
      type: Array,
      default () {
        return ['red', 'yellow', 'blue']
      }
    }
  },
  created () {

  },
  mounted () {

  },
  watch: {
    isShow (val) {
      if (val === true) {
        this.$nextTick(() => {
          const ctx = document.getElementById('canvas').getContext('2d')
          this.ctx = ctx
          window.requestAnimationFrame(this.show)
        })
      } else {
        window.cancelAnimationFrame(this.donghua)
      }
    }
  },
  methods: {
    show () {
      this.ctx.clearRect(0, 0, 500, 500)
      this.run()
      this.donghua = window.requestAnimationFrame(this.show)
    },
    // 判断状态
    run () {
      if (this.end === -0.5 && this.begin === -0.5) {
        this.runNow = this.runOne
      } else if (this.end === 0) {
        this.end -= 2
        this.begin -= 2
        this.runNow = this.runTwo
      } else if (this.end === -0.5 && this.begin === -1) {
        this.runNow = this.runThree
      }
      this.runNow()
    },
    // 中间函数
    runNow () {

    },
    runOne () {
      this.end += this.step
      this.end = Number(this.end.toFixed(3))
      this.ctx.beginPath()
      this.ctx.lineWidth = this.lineWidth
      this.ctx.strokeStyle = this.color[0]
      this.ctx.arc(250, 250, this.radius, this.begin * Math.PI, this.end * Math.PI)
      this.ctx.stroke()
    },
    runTwo () {
      this.end += this.step
      this.end = Number(this.end.toFixed(2))
      this.begin += this.step
      this.begin = Number(this.begin.toFixed(2))
      this.ctx.beginPath()
      this.ctx.strokeStyle = this.color[1]
      this.ctx.arc(250, 250, this.radius, this.begin * Math.PI, this.end * Math.PI)
      this.ctx.stroke()
    },
    runThree () {
      this.begin += this.step
      this.begin = Number(this.begin.toFixed(3))
      this.ctx.beginPath()
      this.ctx.strokeStyle = this.color[2]
      this.ctx.arc(250, 250, this.radius, this.begin * Math.PI, this.end * Math.PI)
      this.ctx.stroke()
    },
    startLoad (obj) {
      this.isShow = true
      this.fuzhi(obj)
    },
    endLoad (obj) {
      this.isShow = false
    },
    fuzhi (obj) {
      if (!obj) return ''
      if (obj.radius) {
        this.radius = obj.radius
      }
      if (obj.step && (obj.step === 0.01 || obj.step === 0.02 || obj.step === 0.05)) {
        this.step = obj.step
      }
      if (obj.background) {
        this.background = obj.background
      }
      if (obj.color) {
        this.color = obj.color
      }
      if (obj.lineWidth) {
        this.lineWidth = obj.lineWidth
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
