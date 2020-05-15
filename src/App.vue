<template>
  <div id="app">
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
