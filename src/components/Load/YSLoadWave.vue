<template>
  <div class='views'
       v-if='isShow'
       :style='{background:background}'>
    <ul>
      <li v-for='(item,index) in new Array(7)'
          :key='index'></li>

    </ul>
  </div>
</template>
<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    background: {
      type: String,
      default: 'rgba(0, 0, 0,0.1)'
    }
  },
  methods: {
    startLoad () {
      this.isShow = true
    },
    endLoad () {
      this.isShow = false
    }
  }
}
</script>
<style scoped>
.views {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
ul {
  position: absolute;
  top: 50%;
  left: 50%;
  letter-spacing: 4px;
  transform: translate(-50%, -50%);
  display: flex;
}
ul li {
  list-style: none;
  width: 4px;
  height: 23px;
  background: black;
  margin: 0 3px;
  animation: animate 0.7s infinite alternate;
}
li:nth-child(1) {
  animation-delay: 0.1s;
}
li:nth-child(2) {
  animation-delay: 0.2s;
}
li:nth-child(3) {
  animation-delay: 0.3s;
}
li:nth-child(4) {
  animation-delay: 0.4s;
}
li:nth-child(5) {
  animation-delay: 0.5s;
}
li:nth-child(6) {
  animation-delay: 0.6s;
}
li:nth-child(7) {
  animation-delay: 0.7s;
}
@keyframes animate {
  0% {
    transform: scaleY(1);
  }
  25% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(1);
  }
  75% {
    transform: scaleY(1);
  }
  100% {
    transform: scaleY(2);
  }
}
</style>
