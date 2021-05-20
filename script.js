const background = document.querySelector('#background'); // background derived from album cover below
const thumbnail = document.querySelector('#thumbnail'); // album cover 
const song = document.querySelector('#song'); // audio object

const songArtist = document.querySelector('.song-artist'); // element where track artist appears
const songTitle = document.querySelector('.song-title'); // element where track title appears
const progressBar = document.querySelector('#progress-bar'); // element where progress bar appears
const playBtn = document.querySelector('#play-pause')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const navigation = document.querySelector('.navigation')

let songIndex = 0;

songs = ['music/Djinee-lade-ft-m.i.mp3', 'music/Iyanya-Truly.mp3', 'music/Joeboy-All-For-You.mp3', 'music/Joeboy-Baby.mp3', 'music/Joeboy-Beginning.mp3', 'music/Johnny_Drille_Something_Better.mp3', 'music/Kiss Daniel-Poko.mp3', 'music/Kiss_Daniel_Laye.mp3', 'music/Major Lazer-Particular.mp3', 'music/Master-KG-Jerusalema-ft-Nomcebo.mp3', 'music/Mr Eazi-Surrender-ft-Simi.mp3', 'music/Ric-Hassani-Thunder-Fire-You.mp3', 'music/Roro-Chike.mp3',]; // object storing paths for audio objects
thumbnails = ['images/Djinee.jpg', 'images/Iyanya.jpg', 'images/Joeboy.jpg', 'images/Joeboy.jpg', 'images/Joeboy.jpg', 'images/Johnny.jpg', 'images/Kiss Daniel.jpg', 'images/Kiss Daniel.jpg', 'images/Major Lazer.jpg', 'images/Master KG.jpg', 'images/Surrender.jpg', 'images/Ric.jpg', 'images/Chike.jpg']; // object storing paths for album covers and backgrounds
songArtists = ['Djinee', 'Iyanya', 'Joeboy', 'Joeboy', 'Joeboy', 'Johnny Drille', 'Kiss_Daniel', 'Kiss_Daniel', 'Major Lazer', 'Master KG', 'Mr Eazi', 'Ric Hassani', 'Chike']; // object storing track artists
songTitles = ["Lade", "Truly", "All For You", "Baby", "Beginning", "Something Better", "Poko", "Laye", "Particular", "Jerusalema", "Surrender", "Thunder Fire You", "Roro"]; // object storing track titles

song.src = songs[songIndex];
thumbnail.src = thumbnails[songIndex];
background.src = thumbnails[songIndex];

songArtist.innerHTML = songArtists[songIndex];
songTitle.innerHTML = songTitles[songIndex];

// function where pp (play-pause) element changes based on playing boolean value - if play button clicked, change pp.src to pause button and call song.play() and vice versa.
let playing = true;
function playPause() {
    if (playing) {
        const song = document.querySelector('#song'),
        thumbnail = document.querySelector('#thumbnail');

        navigation.classList.add('play')
        playBtn.querySelector('i.fas').classList.remove('fa-play')
        playBtn.querySelector('i.fas').classList.add('fa-pause')
        
        song.play();
        playing = false;

    } else {
        navigation.classList.remove('play')
        playBtn.querySelector('i.fas').classList.add('fa-play')
        playBtn.querySelector('i.fas').classList.remove('fa-pause')
        
        song.pause();
        playing = true;
    }
}

// automatically play the next song at the end of the audio object's duration
song.addEventListener('ended', function(){
    nextSong();
});

// function where songIndex is incremented, song/thumbnail image/background image/song artist/song title changes to next index value, and playPause() runs to play next track 
function nextSong() {
    songIndex++;
    if (songIndex > songs.length -1) {
        songIndex = 0;
    };
    song.src = songs[songIndex];
    thumbnail.src = thumbnails[songIndex];
    background.src = thumbnails[songIndex];

    songArtist.innerHTML = songArtists[songIndex];
    songTitle.innerHTML = songTitles[songIndex];

    playing = true;
    playPause();

}

// function where songIndex is decremented, song/thumbnail image/background image/song artist/song title changes to previous index value, and playPause() runs to play previous track 
function previousSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    };
    song.src = songs[songIndex];
    thumbnail.src = thumbnails[songIndex];
    background.src = thumbnails[songIndex];

    songArtist.innerHTML = songArtists[songIndex];
    songTitle.innerHTML = songTitles[songIndex];

    playing = true;
    playPause();
}

// update progressBar.max to song object's duration, same for progressBar.value, update currentTime/duration DOM
function updateProgressValue() {
    progressBar.max = song.duration;
    progressBar.value = song.currentTime;
    document.querySelector('.currentTime').innerHTML = (formatTime(Math.floor(song.currentTime)));
    if (document.querySelector('.durationTime').innerHTML === "NaN:NaN") {
        document.querySelector('.durationTime').innerHTML = "0:00";
    } 
    else {
        document.querySelector('.durationTime').innerHTML = (formatTime(Math.floor(song.duration)));
    }
};

// convert song.currentTime and song.duration into MM:SS format
function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10){ 
        sec  = `0${sec}`;
    };
    return `${min}:${sec}`;
};

// run updateProgressValue function every 1/2 second to show change in progressBar and song.currentTime on the DOM
setInterval(updateProgressValue, 500);

// function where progressBar.value is changed when slider thumb is dragged without auto-playing audio
function changeProgressBar() {
    song.currentTime = progressBar.value;
};