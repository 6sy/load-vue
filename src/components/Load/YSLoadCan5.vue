<template>
  <div class='views'
       :style='{background:background}'
       v-if='isShow'>
    <canvas id='canvas'
            width="200"
            height='200'></canvas>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ctx: '',
      outerRingStart: -0.35,
      outerRingEnd: -0.3,
      step: 0.02,
      insideRingStart: 0.3,
      insideRingEnd: 0.5,
      // 进度
      prograss: 0,
      // 延迟
      i: 0
    }
  },
  props: {
    // xianshi
    isShow: {
      type: Boolean,
      default: false
    },
    // 线宽
    lineWidth: {
      type: Number,
      default: 5
    },
    // 半径
    radius: {
      type: Number,
      default: 80
    },
    background: {
      type: String,
      default: 'rgba(0, 0, 0,0.1)'
    },
    color: {
      type: Array,
      default () {
        return ['black', 'black', 'black']
      }
    }
  },
  mounted () {
    console.log(this)
    // this.$nextTick(() => {
    //   const ctx = document.getElementById('canvas').getContext('2d')
    //   this.ctx = ctx
    //   window.requestAnimationFrame(this.show)
    // })
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
    }
  },
  methods: {
    show () {
      if (this.prograss !== 100) {
        this.prograss += 1
      }
      // 防止报错
      if (!this.ctx) return
      this.ctx.clearRect(0, 0, 200, 200)
      // 画外环
      this.outerRing()
      // 中环
      this.middleRing()
      // 内环
      this.insideRing()
      // 文本
      this.text()
      window.requestAnimationFrame(this.show)
    },
    outerRing () {
      this.outerRingStart += this.step
      this.outerRingEnd += 2 * this.step
      this.ctx.beginPath()
      this.ctx.strokeStyle = this.color[0]
      this.ctx.lineWidth = this.lineWidth
      this.ctx.lineCap = 'round'
      this.ctx.arc(100, 100, this.radius, this.outerRingStart * Math.PI, this.outerRingEnd * Math.PI)
      this.ctx.stroke()
    },
    middleRing () {
      this.ctx.beginPath()
      this.ctx.strokeStyle = this.color[1]
      this.ctx.arc(100, 100, this.radius - 15, 0, 2 * Math.PI)
      this.ctx.stroke()
    },
    insideRing () {
      this.insideRingStart += 0.05
      this.insideRingEnd += 0.056
      this.ctx.beginPath()
      this.ctx.strokeStyle = this.color[2]
      this.ctx.arc(100, 100, this.radius - 30, this.insideRingStart * Math.PI, this.insideRingEnd * Math.PI)
      this.ctx.stroke()
      this.ctx.beginPath()
      this.ctx.arc(100, 100, this.radius - 30, (this.insideRingStart + 0.6) * Math.PI, (this.insideRingEnd + 0.6) * Math.PI)
      this.ctx.stroke()
      this.ctx.beginPath()
      this.ctx.arc(100, 100, this.radius - 30, (this.insideRingStart + 1.4) * Math.PI, (this.insideRingEnd + 1.4) * Math.PI)
      this.ctx.stroke()
    },
    text () {
      this.ctx.beginPath()
      this.ctx.font = '25px magenta'
      this.ctx.lineWidth = 5
      this.ctx.strokeStyle = 'black'
      this.ctx.fillText(this.prograss, 80, 105)
    },
    startLoad () {
      this.isShow = true
    },
    endLoad () {
      this.isShow = false
      Object.assign(this.$data, this.$options.data())
      cancelAnimationFrame(this.show)
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
