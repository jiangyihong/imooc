'use strict';
var test = new Promise(function (res, rej) {
    console.log('Now, we are in executor...');
    res('Send a signal to .then()');
});
console.log('we have just create the Promise object -- test!');
test.then(function (r) {
    console.log('We just receive the signal from res(), which says\n' + '"' + r + '"');
});