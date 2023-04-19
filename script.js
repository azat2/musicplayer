// Declare dynamic elements
const image = document.querySelector('img');
const music = document.querySelector('audio');
const title = document.getElementById('title');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const artist = document.getElementById('artist');
const durationEl = document.getElementById('duration');
const currentTimeEl = document.getElementById('current-time');
const progressContainer = document.getElementById('progress-container');

// Music
const songs = [
    {
        name: 'niche-1',
        displayName: 'Alternative Girl',
        artist: 'YouMorCan',
    },
    {
        name: 'niche-2',
        displayName: 'Dont Talk to Me in the Morning ',
        artist: 'YouMorCan',
    },
    {
        name: 'niche-3',
        displayName: 'Warrior Pixies',
        artist: 'YouMorCan',
    },
    {
        name: 'niche-4',
        displayName: 'Voltage',
        artist: 'YouMorCan',
    }
];


// Check if Playing
let isPlaying = false; 

// Play.
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title','Pause');
    music.play();
}

//Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title','Play');
    music.pause();
}

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Next Song
function prevSong() {
    songIndex--;
    if (songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Update Progress Bar
function updateProgressBar(e) {
    if (isPlaying) {
        const {duration, currentTime} = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);

        if (durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`
        }

        //Delay switching duration element to avoid nan
        if (durationSeconds){
            durationEl.textContent=`${durationMinutes}:${durationSeconds}`;
        }
        // Calculate display for duration
        const currentMinutes = Math.floor(currentTime/60);
        let currentSeconds = Math.floor(currentTime%60);
        
        if (currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`
        }
        
        currentTimeEl.textContent=`${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickPos = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickPos / width) * duration;
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Event Listeners
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
music.addEventListener('ended', nextSong);