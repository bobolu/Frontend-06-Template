let http = require("http");
let fs = require("fs");

fs.stat("./sample.html", (err,stats) => {
  let request = http.request(
    {
      hostname: "127.0.0.1",
      port: 8044,
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Length":  stats.size
      }
    },
    (response) => {
      console.log(response);
    }
  );
  
  let file = fs.createReadStream("./sample.html");
  
  file.pipe(request);
  
  file.on("end", () => request.end());
})



// file.on("data", (chunk) => {
//   console.log(chunk.toString());
//   request.write(chunk);
// });
// file.on("end", (chunk) => {
//   console.log("read finished");
//   request.end(chunk);
// });
