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

// --- ANIMATION VERS HEADER ---
function startLogoMove() {
  title.classList.add('fadeout');
  slogan.classList.add('fadeout');

  setTimeout(() => {
    fadeOut(audioBreeze, 400);
    playSound(audioTint);

    // On place le logo en fixed exactement où il est à l'écran
    const rect = logo.getBoundingClientRect();
    logo.style.position = 'fixed';
    logo.style.left = (rect.left + rect.width / 2) + 'px';
    logo.style.top = (rect.top + rect.height / 2) + 'px';
    logo.style.transform = 'translate(-50%, -50%) scale(1)';
    logo.style.width = rect.width + 'px';

    // Force le navigateur à recalculer avant l'anim
    void logo.offsetWidth;

    // On déclenche l'animation vers le header (verticale uniquement)
    logo.style.transition = "top 1.1s cubic-bezier(.68,-0.55,.27,1.55), width 1.1s cubic-bezier(.68,-0.55,.27,1.55), opacity 0.55s";
    logo.style.top = "36px"; // HAUTEUR EXACTE DU HEADER À AJUSTER SI BESOIN
    logo.style.width = "170px"; // TAILLE DU LOGO HEADER

    // Fondu vitesse au début (tu peux aussi le faire à la fin)
    setTimeout(() => {
      logo.style.opacity = "0";
    }, 700); // Ajuste ce timing selon effet voulu (700ms après début du move)

    setTimeout(() => {
      headerLogo.style.opacity = 1;
      document.getElementById('intro-center').style.display = 'none';
      finishIntro();
    }, 1100); // Match la durée de ton animation top
  }, 250);
}


function finishIntro() {
  setTimeout(() => {
    playSound(audioWhoosh);
    mainContent.style.display = "block";
    fadeOverlay.style.display = "block";
    setTimeout(() => {
      fadeOverlay.classList.add('fadeout');
      setTimeout(() => {
        overlay.style.display = "none";
        fadeOverlay.style.display = "none";
        logo.style.display = 'none';
      }, 1100);
    }, 80);
  }, 100);
}

function skipIntro() {
  // Lance direct la séquence finale avec sons courts
  logo.classList.add('visible', 'animate-to-header', 'fadeout');
  title.classList.add('fadeout');
  slogan.classList.add('fadeout');
  fadeOut(audioBreeze, 200);
  playSound(audioTint);
  headerLogo.style.opacity = 1;
  setTimeout(() => {
    playSound(audioWhoosh);
    mainContent.style.display = "block";
    fadeOverlay.style.display = "block";
    fadeOverlay.classList.add('fadeout');
    setTimeout(() => {
      overlay.style.display = "none";
      fadeOverlay.style.display = "none";
      logo.style.display = 'none';
      document.getElementById('intro-center').style.display = 'none';
    }, 600);
  }, 400);
}

function startIntroSequence() {
  mainContent.style.display = "none";
  overlay.style.opacity = 1;
  overlay.style.display = "flex";
  logo.classList.remove('visible', 'animate-to-header', 'fadeout');
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
