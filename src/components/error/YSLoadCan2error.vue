<template>
  <div>
    <canvas id='canvas'
            width="500"
            height="500"></canvas>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ctx: '',
      arcOneHeight: 250,
      arcTwoHeight: 250,
      i: 0.5,
      j: 1,
      isBack: false
    }
  },
  created () {

  },
  mounted () {
    this.ctx = document.getElementById('canvas').getContext('2d')
    setInterval(this.show, 1000 / 60)
  },
  methods: {
    show () {
      const ctx = this.ctx
      ctx.clearRect(0, 0, 500, 500)
      ctx.beginPath()
      // ctx.arc(250, this.arcOneHeight++, 10, 0, Math.PI * 2)
      ctx.lineWidth = 10
      if (this.isBack) {
        // add
        ctx.arc(250, 250 + this.j, 50, Math.PI * (0.5), Math.PI * (-this.speed()), true)
      } else {
        // jianshao
        ctx.arc(250, 250 + this.j, 50, Math.PI * (this.speed()), Math.PI * (-0.5), true)
      }

      ctx.stroke()
    },
    speed () {
      if (this.i === 0.5) {
        this.isBack = false
      } else if (this.i === -0.5) {
        this.isBack = true
      }
      if (!this.isBack) {
        this.i -= 0.01
        this.i = Number(this.i.toFixed(3))
      } else {
        this.i += 0.01
        this.i = Number(this.i.toFixed(3))
      }
      if (this.j === 100) {
        this.j = 1
      } else {
        this.j++
      }
      console.log(this.j)
      return this.i
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
}
</style>
