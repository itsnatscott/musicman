// set up one song's li
var createLiForSong = function(li, song) {
	li.innerHTML = "";
	li.setAttribute("id", "song" + song.id)
	var songText = song.song_title + " length: " + song.rt + " artist: " + song.artist + " album: " + song.album + " genre: " + song.genre + " rating: ";
	var songTextNode = document.createTextNode(songText);
	li.appendChild(songTextNode)
}


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
		console.log(songs)
		songs.forEach(function(song) {
			showSong(song);
		});
	});
	xhr.send();
};


//New Song 
var addSongButton = document.getElementById("newSong");
addSongButton.addEventListener("click", function() {
	var newTitle = document.getElementById("newSongTitle");
	var newRt = document.getElementById("newSongRt");
	var newArtist = document.getElementById("newSongArtist");
	var newAlbum = document.getElementById("newSongAlbum");
	var newGenre = document.getElementById("newSongGenre");
	var newStar = document.getElementById("newSongStar");
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://localhost:3000/songs");
	xhr.setRequestHeader("Content-Type", "application/jason");
	xhr.addEventListener("load", function() {
		var returnedSong = JSON.parse(xhr.response);
		showSong(returnedSong)
		newTitle.value = "";
		newRt.value = "";
		newArtist.value = "";
		newAlbum.value = "";
		newGenre.value = "";
		newStar.value = "";
	});
	var newSong = {
		title: newTitle.value,
		rt: newRt.value,
		artist: newArtist.value,
		album: newAlbum.value,
		genre: newGenre.value,
		star: newStar.value
	};
	xhr.send(JSON.stringify(newSong));

});



// runs 'mother function' on page load
showAllMusic();