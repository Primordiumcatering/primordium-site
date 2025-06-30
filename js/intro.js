// Ne pas afficher l'intro si déjà vue
if (localStorage.getItem('introShown')) {
  window.location.href = 'index.html';
} else {
  localStorage.setItem('introShown', 'true');
}

document.addEventListener('DOMContentLoaded', () => {
  const logo   = document.getElementById('logo');
  const name   = document.getElementById('name');
  const slogan = document.getElementById('slogan');
  const skip   = document.getElementById('skip');
  const intro  = document.getElementById('intro');

  setTimeout(() => { logo.style.opacity = '1'; skip.style.opacity = '1'; }, 500);
  setTimeout(() => { name.style.opacity = '1'; }, 1500);
  setTimeout(() => { slogan.style.opacity = '1'; }, 2500);

  function endIntro() {
    intro.style.opacity = '0';
    skip.style.opacity = '0';
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  }

  setTimeout(endIntro, 4000);
  skip.addEventListener('click', endIntro);
});