<template>
  <div class="tab">
    <router-link v-for="tab in tabs" :key="tab.path" class="tab-item" :to="tab.path">
      <span class="tab-link">{{ tab.text }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        {path: "/recommend", text: "推荐"},
        {path: "/singer", text: "歌手"},
        {path: "/rank", text: "排行"},
        {path: "/search", text: "搜索"}
      ]
    }
  },
}
</script>

<style scoped lang="stylus" >
@import '../../common/stylus/variable'
.tab
  display flex
  height 44px
  line-height 44px
  font-size $font-size-medium-x
  .tab-item
    flex 1
    text-align center
    .tab-link
      padding-bottom 5px
      color $color-text-l
    &.router-link-active
      .tab-link
        color $color-theme
        border-bottom 2px solid $color-theme
</style>