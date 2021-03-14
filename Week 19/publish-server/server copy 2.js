let http = require("http");
let fs = require("fs");
let unzipper = require("unzipper")


// 2.auth 路由：接收 code ，用code、client_id、client_secret获取access_token

// 4.publish路由：用 token 获取用户信息，检查权限，接受发布

http
  .createServer(function (request, response) {
    // console.log(request.headers);
    // let outFile = fs.createWriteStream("../server/public/tmp.zip");
    // request.pipe(outFile);
    request.pipe(unzipper.Extract({path: "../server/public/"}))
  })
  .listen(8888);
