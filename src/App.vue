<template>
  <div id="app">
    <!-- <ys-load6></ys-load6> -->
  </div>

</template>
<script>

export default {
  data () {
    return {
      aa: true
    }
  },
  mounted () {
    this.$YsLoad6.startLoad()
  }
  // mounted () {
  //   setTimeout(() => {
  //     this.aa = true
  //   }, 1000)
  // const that = this
  // this.$YsLoad6.startLoad()
  // setTimeout(() => {
  //   that.$YsLoad4.startLoad()
  // }, 0)

  // setTimeout(() => {
  //   that.$YsLoad4.endLoad()
  // }, 3000)
  // }
}
</script>
<style lang="less">
</style>
