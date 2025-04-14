const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('song-title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const progress = document.getElementById('progress');
const volumeSlider = document.getElementById('volume');
const repeatBtn = document.getElementById('repeat');
const shuffleBtn = document.getElementById('shuffle');

const songs = [
  {
    title: "On & On",
    artist: "Cartoon feat. Daniel Levi",
    src: "songs/song1.mp3",
    cover: "covers/cover1.jpg"
  },
  {
    title: "Sky High",
    artist: "Elektronomia",
    src: "songs/song2.mp3",
    cover: "covers/cover2.jpg"
  },
  {
    title: "Spectre",
    artist: "Alan Walker",
    src: "songs/song3.mp3",
    cover: "covers/cover3.jpg"
  }
];

let songIndex = 0;
let isRepeat = false;
let isShuffle = false;

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  cover.src = song.cover;
}

function playSong() {
  audio.play();
  playBtn.textContent = '⏸️';
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = '▶️';
}

function togglePlayPause() {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  if (isShuffle) {
    songIndex = Math.floor(Math.random() * songs.length);
  } else {
    songIndex = (songIndex + 1) % songs.length;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Progress bar update
audio.addEventListener('timeupdate', () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});

// Seek in song
progress.addEventListener('input', () => {
  audio.currentTime = (progress.value * audio.duration) / 100;
});

// Volume control
volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

// Repeat toggle
repeatBtn.addEventListener('click', () => {
  isRepeat = !isRepeat;
  repeatBtn.style.background = isRepeat ? '#1db954' : '#333';
});

// Shuffle toggle
shuffleBtn.addEventListener('click', () => {
  isShuffle = !isShuffle;
  shuffleBtn.style.background = isShuffle ? '#1db954' : '#333';
});

// When song ends
audio.addEventListener('ended', () => {
  if (isRepeat) {
    playSong();
  } else {
    nextSong();
  }
});

// Event Listeners
playBtn.addEventListener('click', togglePlayPause);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Load first song
loadSong(songs[songIndex]);
audio.volume = 0.5;
volumeSlider.value = 0.5;
