//delete a song
var deleteSong = function() {
	var li = this.parentNode;
	var id = li.id.substring(4);
	console.log(id)
	var xhr = new XMLHttpRequest();
	xhr.open("DELETE", "http://localhost:3000/song/"+id);
	xhr.addEventListener("load", function(){
		if(JSON.parse(xhr.responseText).deleted === true) {
			li.remove();
		}
	});
	xhr.send();
}


// set up one song's li
var createLiForSong = function(li, song) {
	li.innerHTML = "";
	li.setAttribute("id", "song" + song.id)
	var songText = song.song_title + " length: " + song.rt + " artist: " + song.artist + " album: " + song.album + " rating: " + song.star;
	var songTextNode = document.createTextNode(songText);
	li.appendChild(songTextNode)

	// add delete button
	var deleteButton = document.createElement("button");
	deleteButton.innerText = "DELETE";
	deleteButton.addEventListener("click", deleteSong);
	li.appendChild(deleteButton);
};


// show one song
var showSong = function(song) {
	var li = document.createElement("li");
	createLiForSong(li, song);
	var ul = document.getElementById("songs_list")
	ul.appendChild(li);
};



// show all music
var showAllMusic = function() {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://localhost:3000/music");
	xhr.addEventListener("load", function() {
		var songs = JSON.parse(xhr.response);
		songs.forEach(function(song) {
			showSong(song);
		});
	});
	xhr.send();
};


//New Song 
var addSongButton = document.getElementById("newSong");
addSongButton.addEventListener("click", function() {
	var newTitle = document.getElementById("newSongTitle").value;
		console.log(newTitle);
	var newRt = document.getElementById("newSongRt").value;
	var newArtist = document.getElementById("newSongArtist").value;
	var newAlbum = document.getElementById("newSongAlbum").value;
	var newStar = document.getElementById("newSongStar").value;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://localhost:3000/songs");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.addEventListener("load", function() {
		var returnedSong = JSON.parse(xhr.response);
		showSong(returnedSong)
		newTitle.value = "";
		newRt.value = "";
		newArtist.value = "";
		newAlbum.value = "";
		newStar.value = "";

	});
	var newSong = {
		title: newTitle,
		rt: newRt,
		artist: newArtist,
		album: newAlbum,
		star: newStar,
	};
	xhr.send(JSON.stringify(newSong));

});



// runs 'mother function' on page load
showAllMusic();