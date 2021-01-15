<template>
  <div class="singer-detail">
    <MusicList :title="title" :avatar="avatar" :songs="songs"></MusicList>
  </div>
</template>

<script>
/*
  歌手详情页,用于显示歌手的名称,照片,以及歌曲列表
  但是列表不仅限于shiyong,推荐页,搜索等组件也会用到歌曲列表
  所以将歌曲列表做成公共组件,组件中需要的数据在组件里获取在传递给歌曲列表组件
*/
import MusicList from "../../base/music-list/music-list";
import { mapState } from "vuex";
import tool from "../../api/singer";
import Song from "../../common/js/Song";
export default {
  data() {
    return {
      songs: [], // 获取歌手的歌曲
    };
  },
  computed: {
    ...mapState(["singerInfo"]),
    local() {
      return JSON.parse(localStorage.getItem("singer"));
    },
    title() {
      return this.singerInfo ? this.singerInfo.fname : this.local.fname;
    },
    avatar() {
      return this.singerInfo ? this.singerInfo.avatar : this.local.avatar;
    },
    fid() {
      return this.singerInfo ? this.singerInfo.fid : this.local.fid;
    },
  },
  methods: {
    _getSongList() {
      tool
        .getSongList(this.fid)
        .then((data) => {
          data.forEach((song) => {
            let s = new Song(song.musicData, "");
            this.songs.push(s);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this._getSongList();
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
  background: $color-background
</style>
