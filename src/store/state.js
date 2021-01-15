export const state = {
  singerInfo: null,
  playing: false, // 是否正在播放
  playList: [], // 播放列表
  currentIndex: -1, // 当前播放歌曲的下标索引
  playMode: 1, // 播放模式1-顺序播放 2-单曲循环 3-随机播放
  orderList: [], // 播放的顺序列表
  fullScreen: false, // 是否全屏播放
};
