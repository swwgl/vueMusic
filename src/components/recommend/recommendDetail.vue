<template>
  <div class="singer-detail">
    <MusicList :title="title" :avatar="imgurl" :songs="songs"></MusicList>
  </div>
</template>

<script>
import tool from "../../api/recommend";
import { mapState } from "vuex";
import MusicList from "../../base/music-list/music-list";
export default {
  data() {
    return {
      songs: [],
    };
  },
  computed: {
    ...mapState(["singerInfo"]),
    title() {
      return this.singerInfo.title;
    },
    imgurl() {
      return this.singerInfo.imgurl;
    },
  },
  methods: {
    _getDissSongs() {
      // 获取dissid
      let dissid = this.$route.params.dissid;
      // console.log(dissid);
      tool
        .getDissSongs(dissid)
        .then((data) => {
          // console.log(data);
          this.songs = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this._getDissSongs();
  },
  components: {
    MusicList,
  },
};
</script>

<style scoped lang="stylus">
@import "../../common/stylus/variable"
.singer-detail
  position: fixed
  z-index: 100
  top: 0
  left: 0
  right: 0
  bottom: 0
</style>
