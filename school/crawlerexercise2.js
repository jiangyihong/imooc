var http = require("http");
var cheerio = require("cheerio");
var url = "http://www.imooc.com/learn/348";

http.get(url, function (response) {
    var html = "";
    response.on("data", function (data) {
        html += data;
    });

    response.on("end", function () {
        var courseData = filterChapters(html);
        printCourseInfo(courseData);
    });
}).on("error", function () {
    console.log("获取课程信息失败");
});

/**
 * 过滤筛选课程信息
 */
function filterChapters(html) {
    var courseData = new Array();
    var $ = cheerio.load(html);
    var chapters = $(".chapter");
    chapters.each(function (item) {
        var chapter = $(this);
        var chapterTitle = chapter.find("strong").text().replace(/\s*\r\n\s*/g, "");
        var chapterData = {
            chapterTitle: chapterTitle,
            videos: []
        };

        var videos = chapter.find(".video").children("li");
        videos.each(function (item) {
            var title = $(this).find(".J-media-item").text().replace(/\s*\r\n\s*/g, "").replace("开始学习","");
            var id = $(this).find(".J-media-item").attr("href").split("video/")[1];
            chapterData.videos.push({
                title: title,
                id: id
            });
        });
        courseData.push(chapterData);
    });
    return courseData;
}

/**
 * 显示课程信息
 */
function printCourseInfo(courseData) {
    courseData.forEach(function (item) {
        console.log(item.chapterTitle + "\n");
        item.videos.forEach(function (video) {
            console.log("【" + video.id + "】" + video.title + "\n");
        });
    });
}