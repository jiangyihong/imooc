 'use strict';
// class Person {
//     constructor(name) {
//         this.name = name;
//     }

//     hello() {
//         console.log("Hello," + this.name);
//     }
// }

// class Student extends Person {
//     constructor(name, age) {
//         super(name);
//         this.age = age;
//     }

//     myAge() {
//         console.log("I am " + this.age + "years old");
//     }
// }

// var student = new Student("小明", 19);
// student.hello();
// student.myAge();
class Animal{
    constructor(name){
        this.name = name;
    }
}

class Cat extends Animal{
    constructor(name){
        super(name)
    }

    say(){
        return "Hello," + " "+ this.name + "!";
    }
}
var kitty = new Cat('Kitty');
var doraemon = new Cat('哆啦A梦');
if ((new Cat('x') instanceof Animal) && kitty && kitty.name === 'Kitty' && kitty.say && typeof kitty.say === 'function' && kitty.say() === 'Hello, Kitty!' && kitty.say === doraemon.say) {
    console.log('测试通过!');
} else {
    console.log('测试失败!');
}


