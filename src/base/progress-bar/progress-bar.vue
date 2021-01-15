<template>
  <div class="progress-bar" ref="progressBar">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      touches: {} // 记录触摸点的信息
    }
  },
  methods: {
    // 开始点击
    touchstart(e){
      // 设置一个开关,记录触摸事件是否开始
      this.touches.start = true;
      // 记录当前播放的进度
      this.touches.offsetWidth = this.$refs.progress.clientWidth;
      // 记录当前点击的位置
      this.touches.startX = e.touches[0].pageX;
    },
    // 拖动
    touchmove(e){
      // 按下去的时候才可以进行拖动操作
      if(!this.touches.start){ // start为false,表示touchend事件已经出发执行了,说明鼠标已经松开了
        return ;
      }
      // 鼠标没有松开,开始拖动
      let current = e.touches[0].pageX; // 滑动时当前的位置
      // 移动的距离=当前位置-初始位置
      let distance = current - this.touches.startX;
      // 小圆点的实际位置=初始位置的位移+移动的距离
      distance = this.touches.offsetWidth + distance;
      // 判断小圆点是否在进度条的范围之内
      if(distance<0){
        distance = 0;
      }
      if(distance>this.$refs.progressBar.clientWidth){
        distance = this.$refs.progressBar.clientWidth;
      }
      this._offSet(distance);
      this._setPercent("updateTime");
    },
    // 点击结束
    touchend(e){
      // 触摸结束
      this.touches.start = false;
      // 调用重新设置播放进度的方法
      this._setPercent("changePercent");
    },
    // 修改进度条的位移
    _offSet(distance){
      // 修改已播放进度的长度(有背景色的部分)
      this.$refs.progress.style.width = distance+"px";
      // 修改小圆点的位置
      this.$refs.progressBtn.style.left = distance-8+"px";
    },
    // 设置播放进度
    // type表示不同阶段派发的不同事件
    _setPercent(type){
      // 获取进度条的总长度
      let barWidth = this.$refs.progressBar.clientWidth;
      // 获取拖动的进度的长度(小圆点所在位置的位移)
      let progressWidth = this.$refs.progress.clientWidth;
      // 算出比例
      let percent = progressWidth / barWidth;
      // 将比例派发给播放组件
      this.$emit(type,percent);
    },
    
  },
  props:{
    percent: {
      type: Number,
      default: 0
    }
  },
  watch:{
    // 监听percent值的变化,实时修改进度条的样式
    percent(){
      // 先判断有没有触摸,如果触摸了,则进度条不再自动变化
      if(this.touches.start){
        return ;
      }
      // 播放的进度的长度=比例*总长度
      let width = this.percent*this.$refs.progressBar.clientWidth;
      this._offSet(width);
    }
  }
}
</script>

<style scoped lang="stylus">
@import '~@common/stylus/variable'
.progress-bar
  height 30px
  .bar-inner
    position relative
    top 13px
    height 4px
    background rgba(255, 255, 255, 0.5)
    .progress
      position absolute
      height 100%
      background $color-theme
    .progress-btn-wrapper
      position absolute
      left -8px
      top -13px
      width 30px
      height 30px
      .progress-btn
        position relative
        top 7px
        left 7px
        box-sizing border-box
        width 16px
        height 16px
        border 3px solid #fff
        border-radius 50%
        background #fff
</style>