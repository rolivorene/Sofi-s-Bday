// Countdown functionality
const targetDate = new Date('2025-12-27T00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const countdownElement = document.getElementById('countdown');
    const countdownContainer = document.getElementById('countdown-container');
    const countdownComplete = document.getElementById('countdown-complete');

    if (distance < 0) {
        // Countdown has ended
        countdownContainer.style.display = 'none';
        countdownComplete.style.display = 'block';
    } else {
        countdownElement.innerHTML = `
            <div class="countdown-item">
                <span class="countdown-number">${days}</span>
                <span class="countdown-label">Días</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${hours}</span>
                <span class="countdown-label">Horas</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${minutes}</span>
                <span class="countdown-label">Minutos</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${seconds}</span>
                <span class="countdown-label">Segundos</span>
            </div>
        `;
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Location functionality
// Using a sample location - you can replace this with the actual location
// Format: latitude,longitude

const mapSelect = document.getElementById('map-select');
const openLocationBtn = document.getElementById('open-location');

const mapImageContainer = document.getElementById('map-image-container');
const mapImage = document.getElementById('map-image');

mapSelect.addEventListener('change', function() {
    if (this.value) {
        openLocationBtn.disabled = false;
        // Show corresponding map image
        if (this.value === 'waze') {
            mapImage.src = 'media/waze.png';
            mapImage.alt = 'Waze';
            mapImageContainer.style.display = 'block';
        } else if (this.value === 'google') {
            mapImage.src = 'media/maps.png';
            mapImage.alt = 'Google Maps';
            mapImageContainer.style.display = 'block';
        }
    } else {
        openLocationBtn.disabled = true;
        mapImageContainer.style.display = 'none';
    }
});

openLocationBtn.addEventListener('click', function() {
    const selectedMap = mapSelect.value;
    let url = '';

    if (selectedMap === 'waze') {
        // Waze deep link format: waze://?ll=LATITUDE,LONGITUDE
        url = `https://ul.waze.com/ul?place=ChIJ15jgyOc3Y48R0tadgL-WWPs&ll=13.70646890%2C-89.10290810&navigate=yes`;
    } else if (selectedMap === 'google') {
        // Google Maps deep link format: google.navigation:q=LATITUDE,LONGITUDE
        // Or web format: https://www.google.com/maps/search/?api=1&query=LATITUDE,LONGITUDE
        url = `https://maps.app.goo.gl/YjzTgWiA9mYSttpF7`;
    }

    if (url) {
        window.open(url, '_blank');
    }
});

// Audio playback
const backgroundMusic = document.getElementById('background-music');
const musicControlBtn = document.getElementById('music-control');

// Ensure the audio loops endlessly
backgroundMusic.loop = true;

// Update button icon based on playback state
function updateMusicButton() {
    if (backgroundMusic.paused) {
        musicControlBtn.textContent = '▶️';
        musicControlBtn.title = 'Reproducir música';
    } else {
        musicControlBtn.textContent = '⏸️';
        musicControlBtn.title = 'Pausar música';
    }
}

// Toggle play/pause when button is clicked
musicControlBtn.addEventListener('click', function() {
    if (backgroundMusic.paused) {
        backgroundMusic.play().catch(error => {
            console.log('Error playing audio:', error);
        });
    } else {
        backgroundMusic.pause();
    }
    updateMusicButton();
});

// Update button when audio state changes
backgroundMusic.addEventListener('play', updateMusicButton);
backgroundMusic.addEventListener('pause', updateMusicButton);

// Initialize button state (music starts paused)
updateMusicButton();
