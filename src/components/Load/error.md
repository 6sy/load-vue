#### Can1

1.重复获取ctx,应该在mounted生命周期获取一次即可                   y
2.未实现函数式组件                                              y
3.无法通过vue给外面的构造函数传值，使用localstrange|定义一个全局变量（猜想中）               y
4.导入导出模块依旧有问题                                        n
5.在mounted生命周期获取不到元素，使用this.$nextTick              y
6.大量的if判断数据溢出，是否可以使用watch来观测(性能问题)         n
7.大量的if判断动画状态，是否可以简便                             n
8.canvas大小未调整，为固定死的。应该随着内容大小变化 | 定义一个变量控制整个canvas的尺寸             yn
9使用v-if组件无法获取canvas对象 使用v-show会影响到页面，通过wacth对isShow进行观察，在通过$nextTick获取ctx y终极解决方案
10 有加载条时 当组件隐藏时，需要对数据进行初始化                  y
11 改变 v-if是同步执行还是异步   改为false,获取不到ctx,会报错(在渲染函数时先判断ctx对象)         y
12.找到生命周期执行两次的根本原因 ,因为挂载两个组件，一个是模板的，一个是函数式的 v-if生命周期会执行             n
