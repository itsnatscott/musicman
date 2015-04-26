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
			res.json(rows);
		}
	});
});

// create song
app.post("/songs", function(req,res){
	var title = req.body.title;
	var rt = req.body.rt;
	var artist = req.body.artist;
	var album = req.body.album;
	var star = req.body.star;

	console.log(req.body)


//create song
	db.run("INSERT INTO music (song_title, rt, artist, album, star) VALUES (?, ?, ?, ? ,?)", title, rt, artist, album, star, function(err){
		if (err) {
			console.log(err);
		} else {
			var id = this.lastID;
			db.get("SELECT * FROM music WHERE id = ?", id, function(err,row){
				if (err) {
					console.log (err); 
					
				} else {
					res.json(row);
				}
			});
		}
	});
});

// delete a song
app.delete("/song/:id", function(req,res) {
	var id= req.params.id;
	console.log(req.params.id)
	db.run("DELETE FROM music WHERE id = ?", id, function(err){
		if(err) {console.log(err);}
		else{
			res.json({deleted:true})
		}
	})
});



app.listen(3000);
console.log("Listening on port 3000");


