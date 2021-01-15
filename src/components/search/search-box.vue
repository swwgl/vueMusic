<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input
      ref="query"
      class="box"
      v-model.trim="keyword"
      placeholder="请输入歌手名或歌曲名"
      @blur="search"
    />
    <i class="icon-dismiss" v-show="keyword != ''" @click="clear"></i>
  </div>
</template>

<script>
import bus from "../../base/bus/bus";
import tool from "../../api/search";
export default {
  data() {
    return {
      keyword: "",
    };
  },
  /* props: {
    selectKey: {
      type: String,
      default: "",
    },
  }, */
  mounted() {
    // 挂载成功后,立即开始监听
    bus.$on("chooseKey", (data) => {
      // console.log(data);
      // 监听serach组件点击某个热门搜索的标签
      // 将被点击的热门标签赋值给keyword
      this.keyword = data;
      // 通过chooseKey虽然改变了keyword,但是没有触发onblur事件,不会执行搜索功能
      // 手动调用搜索的方法
      this.search();
    });
  },
  watch: {
    keyword(val) {
      // 当清空搜索框时,result界面应该隐藏
      if (val == "") {
        // 不需要传递数据,仅仅是告诉父组件,result界面隐藏
        this.$emit("clear");
      }
    },
    /* keyword(val) {
      tool.search(val);
    }, */
    // 监听selectKey的变化,将文本框的值变成变化后的值(将keyweod赋值为变化后的值)
    // selectKey(val) {
    //   this.keyword = val;
    // },
    /* keyword(val){
      if(val.trim()==""){
        this.show = false;
      }else {
        this.show =true;
      }
    } */
  },
  methods: {
    clear() {
      // 清空输入框
      this.keyword = "";
    },
    search() {
      // 发送搜索关键字的请求
      if (this.keyword == "") return; // 没有关键字
      tool
        .search(this.keyword)
        .then((data) => {
          // 结果是展示在search组件的search-result中的
          // 所以需要徐江数据传递过去,
          // 搜索的关键字 keyword,搜索的结果 data
          this.$emit("searchResult", this.keyword, data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped lang="stylus">
@import '~@common/stylus/variable'
.search-box
  display flex
  align-items center
  box-sizing border-box
  width 100%
  padding 0 6px
  height 40px
  background #f3f3f3
  border-radius 20px
  .icon-search
    font-size 24px
    color $color-background
  input::-webkit-input-placeholder
    color #ccc
  input:-moz-placeholder
    color #ccc
  input:-ms-input-placeholder
    color #ccc
  .box
    flex 1
    margin 0 5px
    line-height 30px
    background #f3f3f3
    color $color-text
    font-size $font-size-medium
    outline none
    &::placeholder
      color $color-text-d
  .icon-dismiss
    font-size 16px
    color $color-dialog-background
</style>
