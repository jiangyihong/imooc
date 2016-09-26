//导入需要的模块
var http = require("http");
var cheerio = require("cheerio");
//设置目标url
var url = "http://www.imooc.com/learn/348";

/**
 * 发送http请求获取数据
 * */
http.get(url, function (response) {
    var html = "";

    //当有数据的时候保存数据
    response.on("data", function (data) {
        html += data;
    });

    //请求结束以后处理抓取的数据
    response.on("end", function () {
        //过滤章节信息
        var courseData = filterChapters(html);

        printCourseInfo(courseData);
    });
}).on("error", function () {
    console.log("获取课程信息失败");
});

/**
 * 过滤处理章节信息
 */
function filterChapters(html) {
    //加载html内容
    var $ = cheerio.load(html);
    //获取章节信息
    var chapters = $(".chapter");

    // [{
    //     chapterTitle:"",
    //     videos:[{
    //         title:"",
    //         id:""
    //     }]
    // }]
    var courseData = new Array();
    //遍历分析每一个章节
    chapters.each(function (item) {
        var chapter = $(this);
        var chapterTitle = chapter.find("strong").text().replace(/\s*\r\n\s*/g, "");

        //获取所有的video节点
        var videos = chapter.find(".video").children("li");
        //构造章节对象
        var chapterData = {
            chapterTitle: chapterTitle,
            videos: []
        };
        //遍历所有的video节点
        videos.each(function (item) {
            var video = $(this);
            var title = video.find(".J-media-item").text().replace(/\s*\r\n\s*/g, "");
            var id = video.find(".J-media-item").attr("href").split("video/")[1];
            //将video对象添加到chapter对象中
            chapterData.videos.push({
                title: title,
                id: id
            });
        });
        courseData.push(chapter);
    });
    return courseData;
}


/**
 * 输出显示课程信息
 */
function printCourseInfo(courseData) {
    courseData.forEach(function (item) {
        var chapterTitle = item.chapterTitle;
        console.log(chapterTitle + "\n");
        //遍历显示video信息
        item.videos.forEach(function (video) {
            //显示video信息
            console.log("【" + video.id + "】" + video.title + "\n");
        });
    });
}