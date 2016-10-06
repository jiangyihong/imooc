var fs = require("fs");
var path = require("path");
var sourcePath = path.join(__dirname,"IMG_0220.png");
var destPath = path.join(__dirname,"IMG_0220_copy.png");

//创建一个读取流
var readStrem = fs.createReadStream(sourcePath);

//创建一个写入流
var writeStream = fs.createWriteStream(destPath);

//读取文件的同时写入文件信息
readStrem.on("data",function(chunk){
    writeStream.write(chunk);
});

//写入完成之后关闭读取流
writeStream.on("end",function(){
    readStrem.close();
});

console.log("程序执行结束");