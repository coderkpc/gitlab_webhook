// 入口文件
const express = require("express");
const mergeHandle = require("./handle/mergeHandle");

const app = express();
const { port } = require("./const/index");

app.use(express.json());

// 目前只监听合并请求
app.post("/webhook", (req, res) => {
    switch (req.body.event_type) {
      case "merge_request":
          mergeHandle(req.body);
          break;
      default:
          break;
    }
    res.send("get!");
});

app.listen(port, () => {
    console.log(`服务端已启动，正在监听${port}端口`);
});
