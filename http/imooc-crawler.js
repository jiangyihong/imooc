var http = require("http");
var url = "http://www.imooc.com/learn/348";

http.get(url, function(response) {
    var html = "";
    response.on("data", function(data) {
        html += data;
    });

    response.on("end", function() {
        console.log(html);
    });
}).on("error", function() {
    console.log("获取课程数据出错");
});