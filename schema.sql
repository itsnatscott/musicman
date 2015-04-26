DROP TABLE IF EXISTS music;
CREATE TABLE music (
  id INTEGER PRIMARY KEY,
  song_title TEXT, 
  length INTEGER,
  artist TEXT,
    album TEXT,
    genre TEXT,
    star INTEGER
);