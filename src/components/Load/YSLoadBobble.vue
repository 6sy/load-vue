<template>
  <div class='views'
       v-if='isShow'
       :style='{background:background}'>
    <ul class='cdd'>
      <li v-for='(item,index) in new Array(num)'
          :key='index'
          :style='{width:radius,height:radius}'></li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    radius: {
      type: String,
      default: '40px'
    },
    isShow: {
      type: Boolean,
      default: false
    },
    num: {
      type: Number,
      default: 7
    },
    background: {
      type: String,
      default: 'rgba(0, 0, 0, 0.1)'
    }
  },
  mounted () {
  },
  methods: {
    startLoad (obj) {
      this.fuzhi(obj)
      this.isShow = true
    },
    endLoad () {
      this.isShow = false
    },
    // 赋值
    fuzhi (obj) {
      if (!obj) return ''
      if (obj.radius) {
        this.radius = obj.radius
      }
      if (obj.num) {
        this.num = obj.num
      }
      if (obj.background) {
        this.background = obj.background
      }
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  animation: animate 1.6s ease-in-out infinite;
}
li:nth-child(1) {
  animation-delay: -1.4s;
  background: #ffff00;
  box-shadow: 0 0 50px #fff000;
}
li:nth-child(2) {
  animation-delay: -1.2s;
  background: #76ff03;
  box-shadow: 0 0 50px #76ff03;
}
li:nth-child(3) {
  animation-delay: -1s;
  background: #f06292;
  box-shadow: 0 0 50px #f06292;
}
li:nth-child(4) {
  animation-delay: -0.8s;
  background: #4fc3f7;
  box-shadow: 0 0 50px #4fc3f7;
}
li:nth-child(5) {
  animation-delay: -0.6s;
  background: #ba68c8;
  box-shadow: 0 0 50px #ba68c8;
}
li:nth-child(6) {
  animation-delay: -0.4s;
  background: #f57c00;
  box-shadow: 0 0 50px #f57c00;
}
li:nth-child(7) {
  animation-delay: -0.2s;
  background: #673ab7;
  box-shadow: 0 0 50px #673ab7;
}
@keyframes animate {
  0%,
  40%,
  100% {
    transform: scale(0.2);
  }
  20% {
    transform: scale(1);
  }
}
</style>
