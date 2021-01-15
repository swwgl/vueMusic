let axios = require("axios");
let base = require("./webpack.base.js");

module.exports = {
  ...base,
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: __dirname + "/dist",
    port: 8080,
    open: true,
    overlay: {
      errors: true,
    },
    hot: true,
    proxy: [
      {
        context: [
          "/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg",
          "/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg",
          "/v8/fcg-bin/v8.fcg",
          "/v8/fcg-bin/fcg_v8_singer_track_cp.fcg",
          "/splcloud/fcgi-bin/gethotkey.fcg",
          "/splcloud/fcgi-bin/smartbox_new.fcg",
          "/lyric/fcgi-bin/fcg_query_lyric_new.fcg",
        ],
        target: "https://c.y.qq.com/",
        changeOrigin: true,
        headers: {
          referer: "https://c.y.qq.com",
          host: "c.y.qq.com",
        },
      },
      {
        context: ["/cgi-bin/musicu.fcg", "/cgi-bin/musics.fcg"],
        target: "https://u.y.qq.com",
        changeOrigin: true,
        headers: {
          referer: "https://u.y.qq.com",
          host: "u.y.qq.com",
        },
      },
    ],
    before(app) {
      app.get("/getSongsList", function(req, res) {
        // 处理recommend.js中发送的/getSongList请求
        // 用于获取歌单中歌曲
        // query: 请求的参数,url: 请求地址
        let query = JSON.parse(req.query.query);
        let url = req.query.url;
        let dissid = query.disstid;
        axios
          .get(url, {
            params: query,
            headers: {
              referer: `https://y.qq.com/n/yqq/playlist/${dissid}.html`,
              host: "y.qq.com",
            },
          })
          .then((data) => {
            res.send(data.data.cdlist);
          })
          .catch((err) => {
            res.send(err);
          });
      });
    },
  },
};
