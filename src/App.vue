<template>
  <div id="app">
    <!-- <ys-load1 :isShow='aa'></ys-load1> -->

  </div>
</template>
<script>
export default {
  data () {
    return {
      selected: ''
    }
  },
  mounted () {
    // setTimeout(() => {
    //   this.aa = true
    // }, 1000)
    this.$YsLoad1.startLoad()
    setTimeout(() => {
      this.$YsLoad1.endLoad()
    }, 1000)
    setTimeout(() => {
      this.$YsLoad1.startLoad()
    }, 3000)
  }
}
</script>
<style lang="less">
</style>
