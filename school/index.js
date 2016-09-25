var klass = require("./klass.js");

function add(klasses) {
    klasses.forEach(function(item, index) {
        //获取老师姓名
        var teacherName = item.teacherName;
        //获取学生集合
        var students = item.students;
        //添加班级信息
        klass.add(teacherName, students);
    });
}
exports.add = add;