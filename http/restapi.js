var https = require("https");
var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20%3D%202151330&format=json";
https.get(url, function(response) {
    var tempData = "";
    response.on("data", function(data) {
        tempData += data;
    });

    response.on("end", function() {
        console.log(tempData);
    });
}).on("error", function() {
    console.log("获取数据出错");
});