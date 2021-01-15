// 获取歌手页相关的数据
import axios from "axios";
import params from "../common/js/Params";
/**
 * 获取歌手列表
 */
function getSingerList() {
  let url = "/v8/fcg-bin/v8.fcg";
  let query = {
    ...params.Params,
    hostUin: 0,
    needNewCode: 0,
    platform: "yqq.json",
    page: "list",
    channel: "singer",
    key: "all_all_all",
    pagesize: 100,
    pagenum: 1,
  };
  return axios
    .get(url, {
      params: query,
    })
    .then((data) => {
      // 调用格式化数组的方法,得到符合要求的数据
      let list = format(data.data.data.list);
      // console.log(list);
      return Promise.resolve(list);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}
/**
 * 获取歌手列表
 * @param {String} fid 歌手的唯一的id
 */
function getSongList(fid) {
  let url = "/v8/fcg-bin/fcg_v8_singer_track_cp.fcg";
  let query = {
    ...params.Params,
    hostUin: 0,
    needNewCode: 0,
    platform: "yqq.json",
    order: "listen",
    begin: 0,
    num: 100,
    songstatus: 1,
    singermid: fid
  };
  return axios
    .get(url, {
      params: query,
    })
    .then((data) => {
      // console.log(data.data.data);
      return Promise.resolve(data.data.data.list);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export default {
  getSingerList,
  getSongList,
};

/**
 * 将歌手列表的数组格式化成按字母分组的形式
 * @param {Array} arr
 */

function format(arr) {
  let data = {
    // 最终返回的处理过的数据
    hot: {
      title: "热门",
      singers: [],
    },
  };
  // 遍历所有歌手,将歌手按照字母分组
  for (let i = 0; i < arr.length; i++) {
    // 取前十条数据作为热门的数据
    if (i < 10) {
      let singer = {};
      singer.fid = arr[i].Fsinger_mid;
      singer.fname = arr[i].Fsinger_name;
      singer.avatar = `http://y.gtimg.cn/music/photo_new/T001R300x300M000${arr[i].Fsinger_mid}.jpg?max_age=2592000`;
      // 将歌手放入热门中的singers数组中
      data.hot.singers.push(singer);
    }
    // 按字母分组
    // 取首字母
    let key = arr[i].Findex;
    // 先判断data中有没有该字母
    if (!data[key]) {
      // 没有这个key,添加进去
      data[key] = {
        title: key,
        singers: [],
      };
    }
    // 将歌手的数据添加到对应key的singers数组中
    data[key].singers.push({
      fid: arr[i].Fsinger_mid,
      fname: arr[i].Fsinger_name,
      avatar: `http://y.gtimg.cn/music/photo_new/T001R300x300M000${arr[i].Fsinger_mid}.jpg?max_age=2592000`,
    });
  }

  // 排序
  let hot = data.hot; // 热门项
  let letters = []; // 字母项
  let rest = []; // 其他东西(数字符号之类的)
  // 将字母项和其他项筛选出来
  for (let key in data) {
    let code = key.charCodeAt(0); // 获取key对应的码
    if (code > 64 && code < 91) {
      // 说明是字母
      letters.push(data[key]);
    } else if (key != "hot") {
      // 既不是字母,也不是hot,其他项
      rest.push(data[key]);
    }
  }

  // 对字母项的数据排序
  letters.sort((a, b) => {
    return a.title.charCodeAt(0) - b.title.charCodeAt(0);
  });

  // 修改索引,把非字母和热门的索引修改成#
  rest.forEach((val) => {
    val.title = "#";
  });
  // console.log(hot);
  // console.log(letters);
  // console.log(rest);
  data = [hot, ...letters, ...rest];
  return data;
}
