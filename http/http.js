var http = require("http");

http.createServer(function(requst, response) {
    response.writeHead(200, { "content-type": "text/plain" });
    response.write("HelloWorld");
    response.end();
}).listen(8080);