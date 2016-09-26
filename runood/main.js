var querystring = require("querystring");

var data = querystring.parse("keyword=http权威指南&enc=utf-8&suggest=1.def.0.regular&wq=http权威&pvid=7v10yhti.o227n4"); //querystring.parse("foo=bar&baz=qux&baz=quux&corge");

var parameters = querystring.stringify({ name: "scott", course: ["jade", "node"], from: "" });
console.log(parameters);
console.log(data);