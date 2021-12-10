const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const router = new Router();
const config = require("../config");

var bodyParser = require("koa-bodyparser");
app.use(bodyParser());
const cors = require("koa2-cors");
app.use(cors());
// 装载路由中间件
router.use("", require("./handle"));
app.use(router.routes());

let port = config.port;

app.listen(port, function () {
  console.log("服务已开启:localhost:" + port);
});
