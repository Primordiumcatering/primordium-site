const overlay = document.getElementById('intro-overlay');
const logo = document.getElementById('intro-logo');
const title = document.getElementById('intro-title');
const slogan = document.getElementById('intro-slogan');
const skipBtn = document.getElementById('skip-btn');
const mainContent = document.getElementById('main-content');
const headerLogo = document.getElementById('header-logo');
const fadeOverlay = document.getElementById('site-fade-overlay');

function showLogo() {
    logo.classList.add('visible');
    setTimeout(showTitle, 700);
}

function showTitle() {
    title.classList.add('visible');
    setTimeout(showSlogan, 700);
}

function showSlogan() {
    slogan.classList.add('visible');
    setTimeout(startLogoMove, 1300);
}

function startLogoMove() {
    title.classList.add('fadeout');
    slogan.classList.add('fadeout');
    // Animation de montée verticale du logo (même left, juste top change)
    logo.classList.add('animate-to-header');
    setTimeout(() => {
        finishIntro();
    }, 1200); // durée de la montée
}

function finishIntro() {
    // On montre le site (header + logo déjà bien placés)
    mainContent.style.display = "block";
    // On affiche le fadeOverlay sur tout le site sauf le header
    fadeOverlay.style.display = "block";
    // On masque tout sauf le header (le header est déjà apparent)
    setTimeout(() => {
        fadeOverlay.classList.add('fadeout');
        // Après le fadeout, on supprime l'overlay et le logo animé
        setTimeout(() => {
            overlay.style.display = "none";
            fadeOverlay.style.display = "none";
            logo.style.display = 'none'; // cache le logo animé, on garde seulement celui du header
        }, 1100);
    }, 80);
}

function skipIntro() {
    logo.classList.add('visible', 'animate-to-header');
    title.classList.add('fadeout');
    slogan.classList.add('fadeout');
    mainContent.style.display = "block";
    fadeOverlay.style.display = "block";
    fadeOverlay.classList.add('fadeout');
    setTimeout(() => {
        overlay.style.display = "none";
        fadeOverlay.style.display = "none";
        logo.style.display = 'none';
    }, 600);
}

// -------- ANIMATION SEQUENCE --------
function startIntroSequence() {
    mainContent.style.display = "none";
    overlay.style.opacity = 1;
    overlay.style.display = "flex";
    logo.classList.remove('visible', 'animate-to-header');
    logo.style.display = '';
    title.classList.remove('visible', 'fadeout');
    slogan.classList.remove('visible', 'fadeout');
    // headerLogo reste affiché, pas besoin de manip

    fadeOverlay.style.display = "none";
    fadeOverlay.classList.remove('fadeout');

    // Noir → vert foncé (background)
    setTimeout(() => {
        overlay.classList.add('fond-vert');
        setTimeout(showLogo, 700);  // logo
    }, 500);
}

window.addEventListener('load', startIntroSequence);
skipBtn.addEventListener('click', skipIntro);
