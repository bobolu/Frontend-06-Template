let http = require("http");
let https = require("https");
let fs = require("fs");
let unzipper = require("unzipper");
let querystring = require("querystring");

// 2.auth 路由：接收 code ，用code、client_id、client_secret获取access_token
function auth(request, response) {
  let query = querystring.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1]); //.replace("code=", "");
  console.log("query.code:", query.code);
  getToken(query.code, function (info) {
    console.log(info);
    // response.write(JSON.stringify(info));
    response.write(
      `<a href='http://localhost:8899/?token=${info.access_token}'>publish</a>`
    );
    response.end();
  });
}

function getToken(code, callback) {
  let request = https.request(
    {
      hostname: "github.com",
      path: `/login/oauth/access_token?code=${code}&client_id=Iv1.ef65c5bdf45bada5&client_secret=f28a57665a6310ed44c18e3b9fbc5f81875fd63d`,
      port: 443,
      method: "POST"
    },
    function (response) {
      let body = "";
      response.on("data", (chunk) => {
        body += chunk.toString();
      });
      response.on("end", () => {
        callback(querystring.parse(body));
      });
    }
  );
  request.end();
}
// 4.publish路由：用 token 获取用户信息，检查权限，接受发布
function publish(request, response) {
  let query = querystring.parse(request.url.match(/^\/publish\?([\s\S]+)$/)[1]);
  //  if(query.token) {
  getUser(query.token, (info) => {
    if (info.login === "bobolu") {
      request.pipe(
        unzipper.Extract({
          path: "../server/public/"
        })
      );
      request.on("end", () => {
        response.end("publish success");
      });
    } else {
      request.on("end", () => {
        response.end("No publish permission");
      });
    }
  });
  //  }
}

function getUser(token, callback) {
  let request = https.request(
    {
      hostname: "api.github.com",
      path: `/user`,
      port: 443,
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
        "User-Agent": "bobo-pub"
      }
    },
    function (response) {
      let body = "";
      response.on("data", (chunk) => {
        body += chunk.toString();
      });
      response.on("end", () => {
        callback(JSON.parse(body));
      });
    }
  );
  request.end();
}

http
  .createServer(function (request, response) {
    if (request.url.match(/^\/auth\?/)) {
      return auth(request, response);
    }
    if (request.url.match(/^\/publish\?/)) {
      return publish(request, response);
    }
  })
  .listen(8888);
