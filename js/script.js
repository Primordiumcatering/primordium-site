const overlay = document.getElementById('intro-overlay');
const logo = document.getElementById('intro-logo');
const title = document.getElementById('intro-title');
const slogan = document.getElementById('intro-slogan');
const skipBtn = document.getElementById('skip-btn');
const muteBtn = document.getElementById('mute-btn');
const mainContent = document.getElementById('main-content');
const headerLogo = document.getElementById('header-logo');
const fadeOverlay = document.getElementById('site-fade-overlay');

const audioBreeze = document.getElementById('audio-breeze');
const audioTint = document.getElementById('audio-tint');
const audioWhoosh = document.getElementById('audio-whoosh');
let muted = false;

muteBtn.textContent = '🔊';

function playSound(audio) {
  if (!muted) {
    audio.currentTime = 0;
    audio.volume = 1;
    audio.play();
  }
}

// Fade out progressif (ms)
function fadeOut(audio, duration = 400) {
  if (!audio) return;
  let step = audio.volume / (duration / 20);
  let interval = setInterval(() => {
    audio.volume = Math.max(0, audio.volume - step);
    if (audio.volume <= 0.01) {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 1;
      clearInterval(interval);
    }
  }, 20);
}

// Séquence d'intro avec sons
function showLogo() {
  logo.classList.add('visible');
  playSound(audioBreeze); // Brise dès que le logo apparait
  setTimeout(showTitle, 650);
}

function showTitle() {
  title.classList.add('visible');
  setTimeout(showSlogan, 700);
}

function showSlogan() {
  slogan.classList.add('visible');
  setTimeout(startLogoMove, 1350);
}

// --- Nouvelle séquence simplifiée : fondu général ---
function startLogoMove() {
  title.classList.add('fadeout');
  slogan.classList.add('fadeout');

  setTimeout(() => {
    fadeOut(audioBreeze, 400);
    playSound(audioTint);

    setTimeout(() => {
      // Fade out de toute l'overlay + logo + fond noir/vert
      overlay.style.transition = "opacity 0.9s";
      overlay.style.opacity = "0";
      setTimeout(() => {
        overlay.style.display = "none";
        mainContent.style.display = "block";
        headerLogo.style.opacity = 1;
        // Optionnel : joue le whoosh
        playSound(audioWhoosh);
      }, 900);
    }, 300);
  }, 250);
}

function skipIntro() {
  // Saute direct au fade final
  title.classList.add('fadeout');
  slogan.classList.add('fadeout');
  fadeOut(audioBreeze, 200);
  playSound(audioTint);
  overlay.style.transition = "opacity 0.45s";
  overlay.style.opacity = "0";
  setTimeout(() => {
    overlay.style.display = "none";
    mainContent.style.display = "block";
    headerLogo.style.opacity = 1;
    playSound(audioWhoosh);
  }, 450);
}

function startIntroSequence() {
  mainContent.style.display = "none";
  overlay.style.opacity = 1;
  overlay.style.display = "block";
  logo.classList.remove('visible', 'fadeout');
  logo.style.opacity = 1;
  logo.style.display = '';
  logo.style.position = '';
  logo.style.left = '';
  logo.style.top = '';
  logo.style.width = '';
  logo.style.transform = '';
  title.classList.remove('visible', 'fadeout');
  slogan.classList.remove('visible', 'fadeout');
  headerLogo.style.opacity = 0;
  fadeOverlay.style.display = "none";
  fadeOverlay.classList.remove('fadeout');
  document.getElementById('intro-center').style.display = '';
  setTimeout(() => {
    overlay.classList.add('fond-vert');
    setTimeout(showLogo, 800);
  }, 400);
}

window.addEventListener('load', startIntroSequence);
skipBtn.addEventListener('click', skipIntro);

// --- Mute/unmute ---
muteBtn.addEventListener('click', () => {
  muted = !muted;
  muteBtn.textContent = muted ? '🔇' : '🔊';
});

// Accessibilité
skipBtn.tabIndex = 0;
muteBtn.tabIndex = 0;

