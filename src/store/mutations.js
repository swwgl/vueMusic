export const mutations = {
  // 设置歌手的信息
  setSingerInfo(state, payload) {
    state.singerInfo = payload.singer;
  },
  setPlaying(state,payload){ // 设置播放状态
    state.playing = payload.playing;
  },
  setPlayList(state,payload){ // 设置播放列表
    state.playList = payload.playList;
  },
  setCurrentIndex(state,payload){ // 设置当前索引
    state.currentIndex = payload.currentIndex;
  },
  setPlayMode(state,payload){ // 设置播放模式
    state.playMode = payload.playMode;
  },
  setOrderList(state,payload){ // 设置顺序列表
    state.orderList = payload.orderList;
  },
  setFullScreen(state,payload){ // 设置播放模式(是否全屏)
    state.fullScreen = payload.fullScreen;
  }
};
