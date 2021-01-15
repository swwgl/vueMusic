<template>
  <Scroll class="listview" ref="scrollComp" @scroll="goto">
    <ul>
      <!-- 按类分组 -->
      <li v-for="(singers, i) in singerList" :key="i" class="list-group">
        <h1 class="list-group-title">{{ singers.title }}</h1>
        <!-- 歌手列表 -->
        <ul>
          <li
            class="list-group-item"
            v-for="(singer, i) in singers.singers"
            :key="i"
            @click="select(singer)"
          >
            <img :src="singer.avatar" class="avatar" />
            <div class="name">
              {{ singer.fname }}
            </div>
          </li>
        </ul>
      </li>
    </ul>
    <ul class="list-shortcut">
      <li class="item" v-for="(k, i) in indexes" :key="k" @click="scrollTo(i)">
        {{ k }}
      </li>
    </ul>
  </Scroll>
</template>
<script>
import Scroll from "../../base/scroll/scroll";
import tool from "../../api/singer";

export default {
  data() {
    return {
      singerList: [], // 歌手的数据
    };
  },
  methods: {
    _getSingerList() {
      tool
        .getSingerList()
        .then((data) => {
          this.singerList = data;
          // console.log("singerList");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    scrollTo(i) {
      // 点击小字母滚动到对应字母的li分组
      // i 代表的就是对应字母元素的下标
      let lis = document.querySelectorAll("li.list-group"); // 歌手分组的类目
      let ele = lis[i]; // 滚动到的目标位置的元素
      // 先在scroll组件上添加ref属性
      // 通过ref获取到该组件
      // 通过scroll组件滚动到某个元素的方法
      this.$refs.scrollComp.scrollToElement(ele);
    },
    goto(y) {
      let lis = document.querySelectorAll("li.list-group");
      let h1 = 0; // 滚动上去的每个li元素的高度总和
      let h2 = 0; // 滚动上去的miegeli以及滚动了一部分的li的高度
      let index = 0; // 滚动元素的下标
      for (let i = 0; i < lis.length; i++) {
        // 当前滚动到的部分以及上面的元素的所有高度
        h2 += lis[i].offsetHeight;
        // 完全滚动上去的所有元素的高度
        h1 = h2 - lis[i].offsetHeight;
        // 当滚动条滚动的距离大于完全上去的所有元素的高度时
        // y是负值
        if (y > -h1) {
          index = i - 1;
          break;
        }
      }
      let shortcut = document.querySelectorAll(".list-shortcut>li");
      shortcut.forEach((val) => {
        val.className = "item";
      });
      if (index < 0) {
        index = 0;
      }
      shortcut[index].className = "item current";
      // console.log(this.index);
    },
    select(singer) {
      // console.log(singer);
      // 点击某个歌手显示对应的详情页
      // 通过自定义事件将数据派发出去
      // 数据: 歌手名,id,头像地址
      // 自定义事件名叫select
      this.$emit("select", singer);
    },
  },
  computed: {
    // 获取每一个类目的索引[热,A,B,C,...]
    indexes() {
      return this.singerList.map((item) => item.title[0]);
      /* this.singerList.forEach((item) => {
        arr.push(item, tilte.substr(0, 1));
      });
      return arr; */
    },
  },
  created() {
    this._getSingerList();
  },
  updated() {
    // 数据渲染成功后,调用一次goto方法,让热字变色
    this.goto(0);
  },
  components: {
    Scroll,
  },
};
</script>
<style scoped lang="stylus">
@import '../../common/stylus/variable';

.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .list-group {
    padding-bottom: 30px;

    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: #fff;
      background: #666;
    }

    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }

  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;

    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;

      &.current {
        color: $color-theme;
      }
    }
  }

  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
