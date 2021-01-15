<template>
  <div class="slider">
    <van-swipe :autoplay="3000" indicator-color="red" class="slider-group">
      <van-swipe-item v-for="(item,i) in list" :key="i" class='slider-item'>
        <img :src="item.picUrl">
      </van-swipe-item> 
    </van-swipe>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    list: {
      type: Array,
      default(){
        return [];
      }
    }
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
 @import '../../common/stylus/variable.styl';

.slider {
  min-height: 1px;

  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;

    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;

      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }

      img {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>