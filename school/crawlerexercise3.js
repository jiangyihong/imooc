//导入需要的模块
var http = require("http");
var cheerio = require("cheerio");
var url = "http://www.imooc.com/learn/348";

/**
 * 发送Http请求获取页面信息
 */
http.get(url, function (response) {
    var html = "";
    //在有数据的时候保存数据
    response.on("data", function (data) {
        html += data;
    });

    //请求结束的时候筛选处理结果
    response.on("end", function () {
        var courseData = filterChapters(html);
        //展示课程信息
        printCourseInfo(courseData);
    });
}).on("error", function () {
    console.log("获取课程信息失败");
});

/**
 * 筛选章节信息
 */
function filterChapters(html) {
    var courseData = new Array();
    //加载Html
    var $ = cheerio.load(html);

    //获取章节节点
    var chapters = $(".chapter");

    // [{
    //     chapterTitle:"",
    //     videos:[{
    //         title:"",
    //         id:""
    //     }]
    // }]
    //遍历章节节点分析数据
    chapters.each(function (item) {
        var chapter = $(this);
        //获取章节标题
        var chapterTitle = chapter.find("strong").text().replace(/\s*\r\n\s*/g, "");
        //获取所有video节点
        var videos = chapter.find(".video").children("li");

        //构造章节对象
        var chapterData = {
            chapterTitle: chapterTitle,
            videos: []
        };
        //遍历video节点
        videos.each(function (item) {
            var title = $(this).find(".J-media-item").text().replace(/\s*\r\n\s*/g, "");
            var id = $(this).find(".J-media-item").attr("href").split("video/")[1];
            //添加到章节的video列表中
            chapterData.videos.push({
                title: title,
                id: id
            });
        });
        //章节信息添加到课程列表
        courseData.push(chapterData);
    });
    return courseData;
}

/**
 * 展示课程信息
 */
function printCourseInfo(courseData) {
    courseData.forEach(function (item) {
        console.log(item.chapterTitle + "\n");
        //遍历video列表
        item.videos.forEach(function (video) {
            console.log("【" + video.id + "】" + video.title + "\n");
        });

    });
}