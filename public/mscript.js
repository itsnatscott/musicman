// show all music
var showALLMusic = function(){
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:3000/music");
xhr.addEventListener("load", function(){
	var songs = JSON.parse(xhr.response);
	songs.forEach(function(song){
		showSong(song);
	});
});
xhr.send();
};