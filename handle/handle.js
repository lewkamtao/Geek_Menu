const Router = require("koa-router");
const router = new Router();
const fs = require("fs");

/**
 * @description 创建和验证token
 * @date  2021.11.26
 * @author kamto
 */

const jwt = require("jsonwebtoken");
const config = require("../config");

//撒盐，加密时候混淆
const secret = config.secret;
const password = config.password;

function createToken(userSecret) {
  return jwt.sign(userSecret, secret, {
    //Token有效时间 单位s
    expiresIn: 60 * 60 * 24 * 30,
  });
}

//验证Token
function verifyToken(token) {
  return jwt.verify(token, secret);
}

router
  .get("/menu/list", (ctx, next) => {
    return new Promise(function (resolve) {
      try {
        // 异步读取
        fs.readFile("menu.json", "utf-8", function (err, data) {
          try {
            if (err) {
              ctx.body = {
                code: 404,
                tips: "没有找到内容",
                mes: "没有找到内容",
                data: null,
              };
              resolve();
            }
            ctx_data = JSON.parse(data);
            ctx.body = {
              code: 200,
              tips: "",
              mes: "获取成功",
              data: ctx_data,
            };
          } catch (err) {
            ctx.body = {
              code: 404,
              tips: "没有找到内容",
              mes: "没有找到内容",
              data: err,
            };
            resolve();
          }
          resolve();
        });
      } catch (err) {
        ctx.body = {
          code: 500,
          tips: "获取失败",
          mes: "获取失败",
          data: err,
        };
        resolve();
      }
    });
  })
  .put("/menu", async (ctx, next) => {
    if (!ctx.request.body.token) {
      ctx.body = {
        code: 401,
        tips: "请登录",
        mes: "请登录",
        data: null,
      };
      return;
    }
    if (!verifyToken(ctx.request.body.token)) {
      ctx.body = {
        code: 401,
        tips: "token已失效",
        mes: "token已失效",
        data: null,
      };
      return;
    }
    var err = await new Promise(function (resolve) {
      try {
        //把data对象转换为json格式字符串
        var body = ctx.request.body; // 更新单个文档
        fs.writeFile("menu.json", JSON.stringify(body), function (err) {
          if (err) {
            resolve("保存失败");
          }
          resolve(false);
        });
      } catch (err) {
        resolve(err + "读取错误");
      }
    });
    if (!err) {
      ctx.body = {
        code: 200,
        tips: "保存成功",
        mes: "保存成功",
        data: null,
      };
    } else {
      ctx.body = {
        code: 400,
        tips: "",
        mes: err,
        data: null,
      };
    }
  })
  .post("/login", async (ctx, next) => {
    var user = {
      username: ctx.request.body.username,
      password: ctx.request.body.password,
    };
    if (
      user.password === config.password &&
      user.username === config.username
    ) {
      ctx.body = {
        code: 200,
        tips: "登录成功",
        data: {
          token: createToken(user),
        },
      };
    } else {
      ctx.body = {
        code: 400,
        tips: "账号与密码不匹配",
      };
    }
  });

module.exports = router.routes();
