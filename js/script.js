const overlay = document.getElementById('intro-overlay');
const logo = document.getElementById('intro-logo');
const title = document.getElementById('intro-title');
const slogan = document.getElementById('intro-slogan');
const skipBtn = document.getElementById('skip-btn');
const mainContent = document.getElementById('main-content');
const headerLogo = document.getElementById('header-logo');
const header = document.getElementById('site-header');

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
    // Disparition du nom/slogan pendant la montée
    title.classList.add('fadeout');
    slogan.classList.add('fadeout');
    // Lancer la translation du logo vers le header
    logo.classList.add('animate-to-header');
    setTimeout(() => {
        logo.classList.add('in-header');
        // Afficher le site après la translation
        setTimeout(finishIntro, 1100);
    }, 100); // léger délai pour déclencher la transition CSS proprement
}

function finishIntro() {
    overlay.style.opacity = 0;
    setTimeout(() => {
        overlay.style.display = "none";
        mainContent.style.display = "block";
        // On affiche aussi le logo du header comme backup (pour accessibilité/menu)
        headerLogo.classList.add('visible');
        // On s'assure que le logo animé ne gêne plus la navigation
        setTimeout(() => {
            logo.style.display = 'none';
        }, 400);
    }, 800);
}

function skipIntro() {
    // Affiche direct, saute animation
    logo.classList.add('visible', 'animate-to-header', 'in-header');
    title.classList.add('fadeout');
    slogan.classList.add('fadeout');
    overlay.style.opacity = 0;
    setTimeout(() => {
        overlay.style.display = "none";
        mainContent.style.display = "block";
        headerLogo.classList.add('visible');
        setTimeout(() => {
            logo.style.display = 'none';
        }, 400);
    }, 300);
}

// -------- ANIMATION SEQUENCE --------
function startIntroSequence() {
    mainContent.style.display = "none";
    overlay.style.opacity = 1;
    overlay.style.display = "flex";
    logo.classList.remove('visible', 'animate-to-header', 'in-header');
    logo.style.display = '';
    title.classList.remove('visible', 'fadeout');
    slogan.classList.remove('visible', 'fadeout');
    headerLogo.classList.remove('visible');

    // Noir → vert foncé (background)
    setTimeout(() => {
        overlay.classList.add('fond-vert');
        setTimeout(showLogo, 700);  // logo
    }, 500);
}

window.addEventListener('load', startIntroSequence);
skipBtn.addEventListener('click', skipIntro);
