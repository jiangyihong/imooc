// var obj = {
//     birth: 1990,
//     getAge: function (year) {
//         var b = this.birth; // 1990
//         var fn = (y) => y - this.birth; // this.birth仍是1990
//         return fn.call({birth:2000}, year);
//     }
// };
// console.log(obj.getAge(2016));
// var fn = (x, y) => { return x + y };
// console.log(fn(1,2));
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

array.forEach(n => {
    console.log(n);
});