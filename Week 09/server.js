const http = require("http");
http
  .createServer((request, response) => {
    console.log("request received");
    console.log("request.headers:", request.headers);
    response.setHeader("Content-Type", "text/html");
    response.setHeader("X-Foo", "bar");
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end(`<html lang="zh-CN">
      <head>
        <title>test html</title>
        <style>
        * {
          margin: 0;
          padding: 0;
        }
        .testp {
          font-size:16px;
        }
        </style>
      </head>
      <body>
        <div><img class="cscs" /></div>
        <div><img id="cs" /></div>
        <p class="testp">this is a p </p>
      </body>
    </html>`);
})
.listen(8088);
console.log("server started");