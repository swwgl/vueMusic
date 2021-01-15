<template>
  <div ref="wrapper">
    <slot></slot>
    <!-- 滚动的内容不固定,所以采用插槽来接收滚动的内容 -->
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Vue from "vue";

export default {
  data() {
    return {
      scroll: null,
    };
  },
  methods: {
    // 初始化scroll对象
    _initScroll() {
      let div = this.$refs.wrapper;
      if (!div) {
        // 没有div,返回,不创建
        return;
      }
      this.scroll = new BScroll(div, {
        click: true,
        probeType: 3,
      });
      this.scroll.on("scroll", ({ y }) => {
        // 自定义事件,将y值传给外面
        this.$emit("scroll", y);
      });
      // console.log("init scroll");
    },
    // 滚动到指定元素
    scrollToElement(ele) {
      this.scroll && this.scroll.scrollToElement(ele, 500);
    },
    // 滚动到顶部
    scrollToTop() {
      this.scroll && this.scroll.scrollTo(0, 0, 500);
    },
    // 启用滚动条
    enable() {
      this.scroll && this.scroll.enable();
    },
    // 刷新,重新计算滚动条
    refresh() {
      this.scroll && this.scroll.refresh();
    },
  },
  // 挂载成功后,在页面渲染完成之后再执行初始化方法
  mounted() {
    // mounted(){
    this.$nextTick(() => {
      this._initScroll();
    });
    // setTimeout(() => {
    //   this._initScroll();
    // }, 100);
    /* Vue.nextTick(() => {
      this._initScroll();
    });*/
  },
};
</script>

<style></style>
