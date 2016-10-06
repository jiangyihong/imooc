var fs   = require("fs");
var path = require("path");

var sourcePath = path.join(__dirname,"IMG_0220.png");
var destPath   = path.join(__dirname,"IMG_0220_pipe.png");

//创建一个读取流对象
var readStream  = fs.createReadStream(sourcePath);

//创建一个写入流对象
var writeStream = fs.createWriteStream(destPath);

//读取并将内容写入
readStream.pipe(writeStream);

console.log("程序执行结束");