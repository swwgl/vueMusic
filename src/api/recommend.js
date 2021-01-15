// 发送请求,获取recommend页需要的数据
import axios from "axios";
import params from "../common/js/Params";
import Song from "../common/js/Song";

/**
 * 获取轮播图
 */
function getSliderList() {
  // 请求地址
  let url = "/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
  // 请求参数
  let query = {
    ...params.Params,
    uin: 0,
    platform: "h5",
    needNewCode: 1,
  };
  // 发请求
  return axios
    .get(url, {
      params: query,
    })
    .then((data) => {
      return Promise.resolve(data.data.data.slider);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}
/**
 * 获取热门歌曲列表
 */
function getHotSongList() {
  let url = "/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg";
  let data = {
    picmid: 1,
    rnd: Math.random(),
    g_tk_new_20200303: 5381,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: "json",
    inCharset: "utf8",
    outCharset: "utf-8",
    notice: 0,
    platform: "yqq.json",
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 19,
  };
  return axios
    .get(url, {
      params: data,
    })
    .then((res) => {
      return Promise.resolve(res.data.data.list);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

/**
 * 获取推荐页的某个歌单的歌曲列表
 * @param {*} dissid 歌单的id
 */
function getDissSongs(dissid) {
  let url = "https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg";
  let query = {
    ...params.Params,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    new_format: 1,
    disstid: dissid,
    g_tk_new_20200303: 5381,
    loginUin: 0,
    hostUin: 0,
    platform: "yqq.json",
    needNewCode: 0,
  };
  return axios
    .get("/getSongsList", {
      params: { query, url },
    })
    .then((data) => {
      console.log(data);
      let list = data.data[0].songlist; // 歌曲列表
      // 解析列表,去除需要的数据
      // (专辑名,专辑id,歌曲名,歌曲mid,唱歌的人singer)
      let songs = [];
      list.forEach((song) => {
        let {
          album: {
            mid: albummid, // 歌曲名
            name: albumname, // 专辑名
          },
          singer, // 歌手
          name: songname, // 歌曲名
          mid: songmid, // 歌曲mid
        } = song;
        let obj = {
          albummid,
          albumname,
          singer,
          songname,
          songmid,
        };
        songs.push(new Song(obj, ""));
      });
      // console.log(songs);
      return Promise.resolve(songs);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export default {
  getSliderList,
  getHotSongList,
  getDissSongs,
};
