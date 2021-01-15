<template>
  <div class="song-list">
    <ul>
      <li
        v-for="(song, i) in songs"
        :key="i"
        class="item"
        @click="chooseSong(i)"
      >
        <div class="content">
          <h2 class="name">
            {{ song.songname }}
          </h2>
          <p class="desc">{{ song.singer }} ~ {{ song.albumname }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    chooseSong(index) {
      // 派发选择歌曲事件,将被选择的歌曲小吧传递个父组件
      this.$emit("chooseSong", index);
    },
  },
};
</script>

<style scoped lang="stylus">
@import '~@common/stylus/variable'
@import '~@common/stylus/mixin'
.song-list
  .item
    display flex
    align-items center
    box-sizing border-box
    height 64px
    font-size $font-size-medium
    // .rank {
    // flex: 0 0 25px;
    // width: 25px;
    // margin-right: 30px;
    // text-align: center;

    // .icon {
    // display: inline-block;
    // width: 25px;
    // height: 24px;
    // background-size: 25px 24px;

    // &.icon0 {
    // bg-image('first');
    // }

    // &.icon1 {
    // bg-image('second');
    // }

    // &.icon2 {
    // bg-image('third');
    // }
    // }

    // .text {
    // color: $color-theme;
    // font-size: $font-size-large;
    // }
    // }
    .content
      flex 1
      line-height 20px
      overflow hidden
      // display flex
      align-items center
      .index
        margin-right 15px
      .name
        no-wrap()
        color #222
        font-size 16px
      .desc
        no-wrap()
        // margin-top 4px
        color #888
  .bgColor
    background #f3f3f3
</style>
