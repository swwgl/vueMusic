import axios from "axios";
import params from "../common/js/Params";

/**
 * 获取歌曲的地址
 * @param {String} songmid 歌曲的mid
 */
function getPlayKey(songmid) {
  let url = "/cgi-bin/musicu.fcg";
  let query = {
    ...params.Params,
    "-": "getplaysongvkey7628821675300717",
    sign: "zzay0hee0g843kduqh6a2253990dc587dc0bff90fbaeb45184",
    loginUin: 0,
    hostUin: 0,
    platform: "yqq.json",
    needNewCode: 0,
    data: {
      req: {
        module: "CDN.SrfCdnDispatchServer",
        method: "GetCdnDispatch",
        param: {
          guid: "2254122000",
          calltype: 0,
          userip: "",
        },
      },
      req_0: {
        module: "vkey.GetVkeyServer",
        method: "CgiGetVkey",
        param: {
          guid: "2254122000",
          songmid: [songmid],
          songtype: [0],
          uin: "0",
          loginflag: 1,
          platform: "20",
        },
      },
      comm: {
        uin: 0,
        format: "json",
        ct: 24,
        cv: 0,
      },
    },
  };
  return axios
    .get(url, {
      params: query,
    })
    .then((data) => {
      let purl = data.data.req_0.data.midurlinfo[0].purl;
      let songUrl = "http://isure.stream.qqmusic.qq.com/" + purl;
      return Promise.resolve(songUrl);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export default {
  getPlayKey,
};
