var http = require("http");
var cheerio = require("cheerio");
var url = "http://www.imooc.com/learn/348";

/**
 * 过滤章节信息
 */
function filterChapters(html) {
    var $ = cheerio.load(html);
    var chapters = $(".chapter");

    // [{
    //     chapterTitle:"",
    //     videos:[{
    //         title:"",
    //         id:""
    //     }]
    // }]
    //课程信息
    var courseData = new Array();
    //遍历章节信息
    chapters.each(function(item) {
        var chapter = $(this);
        var chapterTitle = chapter.find("strong").text().replace(/\s*\r\n\s*/g,"");
        var videos = chapter.find(".video").children("li");
        var chapterData = {
            chapterTitle: chapterTitle,
            videos: []
        };

        videos.each(function(item) {
            //获取video对象
            var video = $(this).find(".J-media-item");
            var videoTitle = video.text().replace(/\s*\r\n\s*/g, "");
            var id = video.attr("href").split("video/")[1].replace(/\s*\r\n\s*/g, "");
            chapterData.videos.push({
                videoTitle: videoTitle,
                id: id
            });
        });

        courseData.push(chapterData);
    });
    return courseData;
}

/**
 * 遍历显示课程信息
 */
function printCourseInfo(courseData) {
    courseData.forEach(function(item) {
        var chapterTitle = item.chapterTitle;
        console.log(chapterTitle + "\n");
        //显示视频信息
        item.videos.forEach(function(video) {
            console.log("【" + video.id + "】" + video.videoTitle + "\n");
        });
    });
}

/**
 * 发送httl请求获取数据
 */
http.get(url, function(response) {
    var html = "";

    //当用有数据的时候将数据放到赋值给html
    response.on("data", function(data) {
        html += data;
    });

    response.on("end", function() {
        //过滤章节信息
        var courseData = filterChapters(html);
        //console.log(html);
        //输出课程信息
        printCourseInfo(courseData);
    });
}).on("error", function() {
    console.log("获取课程数据出错");
});