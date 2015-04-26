var express = require("express");
var sqlite3 = require("sqlite3").verbose();
var bodyParser = require("body-parser");
var db = new sqlite3.Database("music.db");
var app = express();
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json({extended: false}))

//get all music
app.get("/music", function(req, res){
	db.all("SELECT * FROM music", function(err, rows){
		if(err){
			console.log(err);
		} else {
			res.render('index.html');
			res.json(rows);
		}
	});
});






app.listen(3000);
console.log("Listening on port 3000");


