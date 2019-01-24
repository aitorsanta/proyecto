var controller = require("./controller");
var urlResponseHandlers = require("./urlResponseHandlers");
let port = process.env.PORT;

if (port == null || port == "") {
  port = 3000;
}


// Load the express library, which we installed using npm
var express = require("express");
var app = express();

app.use(express.static(__dirname + '/static'));

app.get('/', (req, res) => {
	res.redirect("index.html");
});

app.listen(port, () => {console.log(`Proyecto fin de grado en marcha: port ${port}!`)})