export const actions = {
  // actions可以一次性提交多个mutation
  // 设置播放的歌曲,同时,也设置了被播放歌曲相关的一些状态
  setPlaySong({ commit }, { playList, currentIndex }) {
    // 采用解构赋值的方式获取context的commit方法
    // 传进来的参数有: 播放列表,当前播放的下标
    commit("setPlaying", { playing: true });
    commit("setPlayList", { playList });
    commit("setCurrentIndex", { currentIndex });
    commit("setOrderList", { OrderList: playList });
  },
};
