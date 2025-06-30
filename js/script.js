const overlay = document.getElementById('intro-overlay');
const logo = document.getElementById('intro-logo');
const title = document.getElementById('intro-title');
const slogan = document.getElementById('intro-slogan');
const skipBtn = document.getElementById('skip-btn');
const mainContent = document.getElementById('main-content');

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
    setTimeout(endIntro, 1300);
}

function endIntro() {
    // Fade out title and slogan
    title.classList.remove('visible');
    slogan.classList.remove('visible');
    setTimeout(() => {
        // Overlay fade to transparent
        overlay.style.transition = "background 0.9s cubic-bezier(.4,0,.2,1), opacity 1s";
        overlay.style.opacity = 0;
        setTimeout(() => {
            overlay.style.display = "none";
            mainContent.style.display = "block";
        }, 900);
    }, 750);
}

function skipIntro() {
    logo.classList.add('visible');
    title.classList.add('visible');
    slogan.classList.add('visible');
    overlay.style.transition = "background 0.6s, opacity 0.5s";
    overlay.style.opacity = 0;
    setTimeout(() => {
        overlay.style.display = "none";
        mainContent.style.display = "block";
    }, 500);
}

// -------- ANIMATION SEQUENCE --------
function startIntroSequence() {
    mainContent.style.display = "none";
    overlay.style.opacity = 1;
    overlay.style.display = "flex";
    logo.classList.remove('visible');
    title.classList.remove('visible');
    slogan.classList.remove('visible');

    // Noir → vert foncé (background)
    setTimeout(() => {
        overlay.classList.add('fond-vert');
        setTimeout(showLogo, 700);  // logo
    }, 550);
}

window.addEventListener('load', startIntroSequence);
skipBtn.addEventListener('click', skipIntro);
