// 封装歌曲类
/* 
用到的数据:
  albummid   专辑的id
  albumname  专辑的名称
  songmid    歌曲的id
  songname   歌曲的名称
  interval  歌曲的总时间
  ========================
  url: 歌曲的资源地址
*/

export default class Song {
  constructor({ albummid, albumname, songmid, songname, singer,interval }, url) {
    this.albummid = albummid;
    this.albumname = albumname;
    this.songmid = songmid;
    this.songname = songname;
    this.singer = format(singer);
    this.interval = interval;
    this.url = url;
  }
}

function format(singerArr) {
  let arr = [];
  singerArr.forEach((singer) => {
    arr.push(singer.name);
  });
  return arr.join(" / ");
}
