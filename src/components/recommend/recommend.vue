<template>
  <div class="recommend">
    <Scroll class="recommend-content">
      <div>
        <!-- 轮播图 -->
        <div class="slider-wrapper">
          <Slider :list="sliderList"></Slider>
        </div>
        <!-- 热门歌曲列表 -->
        <div class="recommend-list">
          <h1 class="list-title">热门歌曲推荐</h1>
          <ul>
            <li
              v-for="(item, i) in hotSongList"
              :key="i"
              class="item"
              @click="select(item)"
            >
              <div class="p-left"></div>
              <div class="p-right"></div>
              <div class="icon">
                <img :src="item.imgurl" class="recom-img" />
              </div>
              <div class="text">
                <div class="name">
                  {{ item.creator.name }}
                </div>
                <div class="desc">
                  {{ item.dissname }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Scroll>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import tool from "../../api/recommend";
import Scroll from "../../base/scroll/scroll.vue";
import Slider from "../../base/slider/Slider";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      sliderList: [], // 轮播图的数据
      hotSongList: [], // 热门歌曲推荐的数据
    };
  },
  methods: {
    ...mapMutations(["setSingerInfo"]),
    // 获取轮播图
    _getSliderList() {
      tool
        .getSliderList()
        .then((data) => {
          // 将数据赋值给sliderList
          this.sliderList = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取热门推荐
    _getHotSongList() {
      tool
        .getHotSongList()
        .then((data) => {
          this.hotSongList = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 点击某个歌单,显示其中的内容
    select(diss) {
      // console.log(diss);
      let title = diss.creator.name;
      let imgurl = diss.imgurl;
      let dissid = diss.dissid;
      // 保存数据到Vuex中
      this.setSingerInfo({
        singer: { title, imgurl, dissid },
      });
      // 根据歌单的dissid值,跳转到某个歌单
      this.$router.push("/recommend/" + diss.dissid);
    },
  },
  created() {
    this._getSliderList();
    this._getHotSongList();
  },
  components: {
    Slider,
    Scroll,
  },
};
</script>

<style scoped lang="stylus">
@import '~@common/stylus/variable'
.recommend
  position fixed
  width 100%
  top 88px
  bottom 0
  .recommend-content
    height 100%
    overflow hidden
    .slider-wrapper
      position relative
      width 100%
      overflow hidden
    .recommend-list
      height 100%
      overflow hidden
      position relative
      .list-title
        height 65px
        line-height 65px
        text-align center
        font-size $font-size-medium-x
        color $color-theme
      .item
        display inline-flex
        box-sizing border-box
        align-items center
        flex-direction column
        width 50%
        .p-left
          padding-left 10px
        .p-right
          padding-right 10px
        .icon
          flex 0 0 60px
          max-width 160px
          .recom-img
            border-radius 10px
            max-width 160px
        .text
          line-height 20px
          font-size $font-size-medium
          max-width 160px
          margin-top 6px
          .name
            margin-bottom 10px
            color #888
          .desc
            color $color-text-d
    .loading-container
      display flex
      align-items center
      justify-content center
      transform translateY(100%)
  .slide-enter-active, .slide-leave-active
    transition all 0.5s
  .slide-enter, .slide-leave-to
    transform translateX(100%)
</style>