javascript
// 🎵 Qo'shiqlar ro'yxati — bu yerga o'z qo'shiqlaringizni qo'shing
const songs = [
    {
        title: "Tungi Yulduz",
        artist: "Sanjar Sobirov",
        cover: "covers/cover1.jpg",
        src: "songs/song1.mp3"
    },
    {
        title: "Sevgi Qo'shig'i",
        artist: "Nilufar Karimova",
        cover: "covers/cover2.jpg",
        src: "songs/song2.mp3"
    },
    {
        title: "Quyoshli Kun",
        artist: "Jasur Xolmatov",
        cover: "covers/cover3.jpg",
        src: "songs/song3.mp3"
    },
    {
        title: "Yomg'ir",
        artist: "Dilnoza Yusupova",
        cover: "covers/cover1.jpg",
        src: "songs/song1.mp3"
    },
    {
        title: "Orzular",
        artist: "Bobur Nazarov",
        cover: "covers/cover2.jpg",
        src: "songs/song2.mp3"
    },
    {
        title: "Yo'llar",
        artist: "Zarina Aliyeva",
        cover: "covers/cover3.jpg",
        src: "songs/song3.mp3"
    }
];

// DOM elementlar
const audio = document.getElementById('audio');
const songsGrid = document.getElementById('songsGrid');
const playIcon = document.getElementById('playIcon');
const playerCover = document.getElementById('playerCover');
const playerTitle = document.getElementById('playerTitle');
const playerArtist = document.getElementById('playerArtist');
const progressBar = document.getElementById('progressBar');
const volumeBar = document.getElementById('volumeBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

let currentIndex = 0;

// Saytga qo'shiqlarni chiqarish
function renderSongs() {
    songsGrid.innerHTML = '';
    songs.forEach((song, i) => {
        const card = document.createElement('div');
        card.className = 'song-card';
        card.dataset.index = i;
        card.innerHTML = `
            <img src="${song.cover}" alt="${song.title}">
            <div class="play-overlay"><i class="fas fa-play"></i></div>
            <h3>${song.title}</h3>
            <p>${song.artist}</p>
        `;
        card.addEventListener('click', () => loadSong(i, true));
        songsGrid.appendChild(card);
    });
}

// Qo'shiqni yuklash
function loadSong(index, autoplay = false) {
    currentIndex = index;
    const song = songs[index];
    audio.src = song.src;
    playerCover.src = song.cover;
    playerTitle.textContent = song.title;
    playerArtist.textContent = song.artist;

    document.querySelectorAll('.song-card').forEach((c, i) => {
        c.classList.toggle('active', i === index);
    });

    if (autoplay) audio.play();
}

// Play/Pause
function togglePlay() {
    if (audio.paused) audio.play();
    else audio.pause();
}

// Icons yangilash
audio.addEventListener('play', () => {
    playIcon.classList.replace('fa-play', 'fa-pause');
});
audio.addEventListener('pause', () => {
    playIcon.classList.replace('fa-pause', 'fa-play');
});

// Vaqt formati
function formatTime(sec) {
    if (isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

// Progress yangilash
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        progressBar.value = (audio.currentTime / audio.duration) * 100;
        currentTimeEl.textContent = formatTime(audio.currentTime);
    }
});
    audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
});

// Progress o'zgartirish
progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Volume
volumeBar.addEventListener('input', () => {
    audio.volume = volumeBar.value;
});

// Oldingi / Keyingi
function nextSong() {
    loadSong((currentIndex + 1) % songs.length, true);
}
function prevSong() {
    loadSong((currentIndex - 1 + songs.length) % songs.length, true);
}

// Tasodifiy
function playRandom() {
    const i = Math.floor(Math.random() * songs.length);
    loadSong(i, true);
}

// Avtomatik keyingi
audio.addEventListener('ended', nextSong);

// Klaviatura shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
    if (e.code === 'ArrowRight') nextSong();
    if (e.code === 'ArrowLeft') prevSong();
});

// Boshlash
renderSongs();
loadSong(0, false);
audio.volume = 0.7;              
