import axios from "axios";
import params from "../common/js/Params";

/**
 * 获取热门搜索关键字
 *
 */
function getHotKey() {
  let url = "/splcloud/fcgi-bin/gethotkey.fcg";
  let query = {
    ...params.Params,
    g_tk_new_20200303: 5381,
    loginUin: 0,
    hostUin: 0,
    platform: "yqq.json",
    needNewCode: 0,
  };
  return axios
    .get(url, {
      params: query,
    })
    .then((data) => {
      // console.log(data.data.data.hotkey);
      return Promise.resolve(data.data.data.hotkey.splice(0, 15));
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

/**
 *
 *
 * @param {*} keyword
 */
function search(keyword) {
  let url = "/splcloud/fcgi-bin/smartbox_new.fcg";
  let query = {
    ...params.Params,
    is_xml: 0,
    key: keyword,
    g_tk_new_20200303: 5381,
    loginUin: 0,
    hostUin: 0,
    platform: "yqq.json",
    needNewCode: 0,
  };
  return axios
    .get(url, {
      params: query,
    })
    .then((data) => {
      // console.log(format(data));
      return Promise.resolve(format(data));
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}
export default {
  getHotKey,
  search,
};

/**
 *
 * 格式化搜索结果
 * @param {*} data  搜索的结果
 */
function format(data) {
  // 取出singer和song的数据
  let { singer, song } = data.data.data;
  let singers = singer.itemlist;
  let songs = song.itemlist;
  let arr1 = getInfo(singers); // 保存处理后的歌手信息 ()
  let arr2 = getInfo(songs); // 保存处理后的歌曲信息 ()
  let obj = {
    singers: arr1,
    songs: arr2,
  };
  return obj;
}

/**
 * 从singer或song里面获取mid,name,以及singer属性值
 * @param {*} data
 */
function getInfo(data) {
  let arr = [];
  data.forEach((val) => {
    let { mid, name, singer } = val;
    arr.push({ mid, name, singer });
  });
  return arr;
}
