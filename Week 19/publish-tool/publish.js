let http = require("http");
let fs = require("fs");
let archiver = require("archiver");
let child_process = require("child_process");
let querystring = require("querystring");

// 1.打开 oauth  https://github.com/login/oauth/authorize

child_process.exec(
  `open https://github.com/login/oauth/authorize?client_id=Iv1.ef65c5bdf45bada5`
);

// 3.创建 server，接受token，然后点击发布。
http
  .createServer(function (request, response) {
    let query = querystring.parse(request.url.match(/^\/\?([\s\S]+)$/)[1]);
    console.log(query);
    publish(query.token)
  })
  .listen(8899);

function publish(token) {
  let request = http.request(
    {
      hostname: "127.0.0.1",
      port: 8888,
      method: "POST",
      path: "/publish/?token=" + token,
      headers: {
        "Content-Type": "application/octet-stream"
      },
      token: token
    },
    (response) => {
      console.log(response);
    }
  );

  const archive = archiver("zip", {
    zlib: { level: 9 }
  });

  archive.directory("./sample/", false);

  archive.finalize();

  archive.pipe(request);

  request.end();
}
