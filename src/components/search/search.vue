<template>
  <div class="search">
    <div class="search-box-wrapper">
      <Search-box @searchResult="getResult" @clear="clear"></Search-box>
    </div>
    <div class="shortcut-wrapper">
      <div class="shortcut">
        <div class="hot-key">
          <div class="title">热门搜索</div>
          <ul>
            <li
              class="item"
              v-for="key in hotkey"
              :key="key.k"
              @click="choose(key.k)"
            >
              {{ key.k }}
            </li>
          </ul>
        </div>
        <h1>搜索历史</h1>
        <Scroll class="search-history">
          <div>
            <div class="title" v-for="(his, i) in history" :key="i">
              <div class="text">{{ his }}</div>
              <div class="clear" @click="del(i)">
                <i class="icon-clear"></i>
              </div>
            </div>
          </div>
        </Scroll>
      </div>
    </div>
    <div class="search-result" v-show="show">
      <Suggest :result="result" />
    </div>
  </div>
</template>

<script>
import SearchBox from "./search-box";
import tool from "../../api/search";
import bus from "../../base/bus/bus";
import Suggest from "./suggest";
import Scroll from "../../base/scroll/scroll";
export default {
  data() {
    return {
      hotkey: [],
      result: {},
      history: [],
    };
  },
  methods: {
    del(i) {
      // console.log(i);
      this.history.splice(i, 1);
      this._setHistory();
    },
    _getHotKey() {
      tool
        .getHotKey()
        .then((data) => {
          this.hotkey = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    choose(keyword) {
      // console.log(keyword);
      // this.selectKey = keyword;
      // 通过bus派发事件 chooseKey
      bus.$emit("chooseKey", keyword);
    },
    _setHistory() {
      // 将history的数据保存到localStorage中
      let str = JSON.stringify(this.history);
      localStorage.setItem("history", str);
    },
    _getHistory() {
      // 从本地存储中取历史记录,如果没有,则默认空数据
      let his = localStorage.getItem("history") || "[]";
      this.history = JSON.parse(his);
    },
    getResult(keyword, data) {
      // console.log(data);
      this.result = data;
      // 将搜索的关键字history存入history中,同时还要更新localStorage中的内容
      // 设置搜索记录
      // 先判断历史记录中有没有这个关键字
      let index = this.history.findIndex((val) => val == keyword);
      // console.log(index);
      if (index == -1) {
        // 历史记录中没有,添加
        this.history.unshift(keyword);
        this._setHistory();
        return;
      }
      // 历史记录中有,就将其从原来的位置移动到第一个位置
      // 将搜索的关键字从原来的数组中切出来
      let key = this.history.splice(index, 1);
      // 将其放入原数组的第一个位置
      this.history = [...key, ...this.history];
      // 重新设置本地存储
      this._setHistory();
    },
    clear() {
      //文本清空,搜索结果清空,result影藏
      this.result = {};
    },
  },
  computed: {
    show() {
      // 决定serach-result的div是否显示
      // 搜索结果的div的显示,由result决定的
      if (this.result.singers == undefined && this.result.songs == undefined) {
        // result中既没有singers,也没有songs
        // 也就是没有搜索的结果
        return false;
      }
      // 有其中的一个或多个
      return true;
    },
  },
  created() {
    this._getHotKey();
    this._getHistory();
  },
  components: { SearchBox, Suggest, Scroll },
};
</script>

<style lang="stylus">
@import '~@common/stylus/variable'
@import '~@common/stylus/mixin'
.search
  .search-box-wrapper
    margin 20px
  .shortcut-wrapper
    position fixed
    top 178px
    bottom 0
    width 100%
    .shortcut
      height 100%
      overflow hidden
      .hot-key
        margin 0 20px 20px 20px
        .title
          margin-bottom 20px
          font-size $font-size-medium-x
          color $color-text-l
          font-weight 900
        .item
          display inline-block
          padding 2px 6px
          margin 0 20px 10px 0
          border-radius 18px
          background $color-text-ll
          font-size $font-size-medium
          color $color-text-d
          border 1px solid #aaa
      h1
        font-size 16px;
        font-weight bold;
        margin 10px 20px;
      .search-history
        position relative
        margin 0 20px
        height 285px
        overflow hidden
        .title
          display flex
          align-items center
          height 40px
          font-size $font-size-medium
          color $color-text-l
          .text
            flex 1
          .clear
            extend-click()
            .icon-clear
              font-size $font-size-medium
              color $color-text-d
  .search-result
    position fixed
    width 100%
    top 178px
    bottom 0
</style>
