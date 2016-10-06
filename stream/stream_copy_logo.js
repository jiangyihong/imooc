var fs   = require("fs");
var path = require("path");
var targetfilePath = path.join(__dirname,"IMG_0220.png");

var destfilePath = path.join(__dirname,"stream_copy_logo.png");
//读取文件
var source = fs.readFileSync(targetfilePath);

//写入文件
fs.writeFileSync(destfilePath,source);