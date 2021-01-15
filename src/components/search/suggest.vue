<template>
  <div ref="suggest" class="suggest">
    <ul class="suggest-list">
      <li>
        <h1 class="title">歌手列表</h1>
      </li>
      <li class="suggest-item" v-for="singer in singers" :key="singer.mid">
        <div class="icon">
          <i class="icon-mine"></i>
        </div>
        <div class="name">
          <p class="text">{{ singer.name }}</p>
        </div>
      </li>
      <hr />
      <li>
        <h1 class="title">歌曲列表</h1>
      </li>
      <li class="suggest-item" v-for="song in songs" :key="song.mid">
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text">{{ song.name }} ~ {{ song.singer }}</p>
        </div>
      </li>
    </ul>
    <div class="no-result-wrapper" display="none">
      <!-- <no-result title="抱歉，暂无搜索结果"></no-result> -->
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
 props:{
   result: {
     type:Object,
     default(){
       return []
     }
   }
 },
 computed: {
   songs(){
     return this.result.songs || [];
   },
   singers(){
     return this.result.singers || [];
   }
 }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable"
@import "../../common/stylus/mixin"
  .suggest
    height: 100%
    overflow: hidden
    background-color #fff
    .suggest-list
      padding: 0 30px
      .title
        height 40px
        font-size $font-size-medium
        color $color-text-l
        font-weight bold
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
