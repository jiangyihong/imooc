function learn(something) {
    console.log(something);
}

function we(something, callback) {
    something += " is cool";
    callback(something);
}

we("nodejs", learn);
we("jade", function(something) {
    console.log(something);
});