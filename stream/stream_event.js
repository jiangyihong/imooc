var fs   = require("fs");
var path = require("path");
var sourceFilePath = path.join(__dirname, "stream_copy_logo.js");
//声明一个只读的流对象
var readStream = fs.createReadStream(sourceFilePath);

readStream
    .on("data",function(chunk){
        console.log("data emits");
        console.log(Buffer.isBuffer(chunk));
        console.log(chunk.toString("utf8"));
    })
    .on("readable",function(){
        console.log("data readable");
    })
    .on("end",function(){
        console.log("data end");
    })
    .on("close",function(){
        console.log("data close");
    })
    .on("error",function(err){
        console.log("data error " + err);
    });