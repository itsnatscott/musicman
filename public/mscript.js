//delete a song
var deleteSong = function() {
	var li = this.parentNode;
	var id = li.id.substring(4);
	console.log(id)
	var xhr = new XMLHttpRequest();
	xhr.open("delete", "http://45.55.154.205:3000/song/" + id);
	xhr.addEventListener("load", function() {
		if (JSON.parse(xhr.responseText).deleted === true) {
			li.remove();
		}
	});
	xhr.send();
}

// update a song
var updateSong = function(li, newTitle, newRt, newArtist, newAlbum, newStar){
	var id = li.id.substring(4);
	console.log(id)
	var xhr = new XMLHttpRequest();
	xhr.open("PUT", "http://45.55.154.205:3000/song/"+ id);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.addEventListener("load", function(){
		var returnedSong = JSON.parse(xhr.response);
		createLiForSong(li, returnedSong);
	});
	var updatedSong = {title: newTitle, rt: newRt, artist: newArtist, album: newAlbum, star: newStar};
	xhr.send(JSON.stringify(updatedSong))
}

//edit a song
var editSong = function(li, title, rt, artist, album, star) {
	li.innerHTML = '';
	var id = li.id.substring(4);
	//song title txtbx
	var titleField = document.createElement("input");
	titleField.setAttribute("type", "text");
	titleField.value = title;
	li.appendChild(titleField);
	//filler text
	var space = document.createTextNode(" ");
	li.appendChild(space);

	//song rt txtbx
	var rtField = document.createElement("input");
	rtField.setAttribute("rt", "text");
	rtField.value = rt;
	li.appendChild(rtField);

	space;

	// song artist txtbx
	var artistField = document.createElement("input");
	artistField.setAttribute("artist", "text");
	artistField.value = artist;
	li.appendChild(artistField);

	space;

	// song albulm txtbx
	var albumField = document.createElement("input");
	albumField.setAttribute("album", "text");
	albumField.value = album;
	li.appendChild(albumField);

	//rating txt
	var rating = document.createTextNode(" rating:");
	li.appendChild(rating);

	//rating txtbx
	var starField = document.createElement("input");
	starField.setAttribute("star", "text");
	starField.value = star;


//////////////////////trying to create drop down select menu
// for (var i = 0; i < 3; i++) {
//     var array = ["&#9733","&#9733&#9733","&#9733&#9733&#9733"]
//     var option = document.createElement("option");
//     option.value = i;
//     option.text = array[i];
//     starField.appendChild(option);
// }

li.appendChild(starField);
	//updatebutton

	var updateButton = document.createElement("button");
	updateButton.innerText = "Update";
	updateButton.addEventListener("click", function() {
		var newTitle = titleField.value;
		var newRt = rtField.value;
		var newArtist = artistField.value;
		var newAlbum = albumField.value;
		var newStar = starField.value;
		updateSong(li, newTitle, newRt, newArtist, newAlbum, newStar);
	})
	li.appendChild(updateButton);
};



// set up one song's li
var createLiForSong = function(li, song) {
	li.innerHTML = "";
	li.setAttribute("id", "song" + song.id)
	var songText = song.song_title + " " + song.rt + " " + song.artist + " " + song.album + " rating: " + song.star;
	var songTextNode = document.createTextNode(songText);
	li.appendChild(songTextNode);

	// set up one song as a list of its parts/////
	// li.innerHTML = "";
	// var ul1 = document.createElement("ul");
	// ul1.innerHTML = ""
	// ul1.setAttribute("id", "title"+song.id);
	// var titleText = song.song_title + " ";
	// var titleTextNode = document.createTextNode(titleText);
	// ul1.appendChild(titleTextNode);

	// var ul2 = document.createElement("ul");
	// ul2.innerHTML = ""
	// ul2.setAttribute("id", "artist"+song.id);
	// var artistText = song.artist + " "
	// var artistTextNode = document.createTextNode(artistText);
	// ul2.appendChild(artistTextNode)
	// console.log(ul1,ul2)

	// li.setAttribute("id", "song" + song.id)
	// var songText =  song.rt + " " + song.album + " rating: " + song.star;
	// var songTextNode = document.createTextNode(songText);
	// console.log(ul1)
	// li.innerHTML = ul1 + ul2
	// li.appendChild(songTextNode);

/////////////////

	// add edit button
	var editButton = document.createElement("button");
	editButton.setAttribute("class", "edit")
	editButton.innerText = "Edit";
	editButton.addEventListener("click", function() {
		editSong(li, song.song_title, song.rt, song.artist, song.album, song.star)
	});
	li.appendChild(editButton);

	// add delete button
	var deleteButton = document.createElement("button");
	deleteButton.setAttribute("class", "delete")
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
	xhr.open("GET", "http://45.55.154.205:3000/music");
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
	xhr.open("POST", "http://45.55.154.205:3000/songs");
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