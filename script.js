// script.js – gère la navigation fluide et les animations

// 🔁 Gestion des clics sur les liens du menu const links = document.querySelectorAll('nav a'); const main = document.querySelector('main');

links.forEach(link => { link.addEventListener('click', async (e) => { e.preventDefault(); const page = link.getAttribute('href').replace('.html', ''); await loadPage(page); window.history.pushState({}, '', link.getAttribute('href')); }); });

// 🔄 Rechargement fluide au clic sur les liens du menu async function loadPage(page) { try { main.style.opacity = 0; // transition douce const res = await fetch(${page}.html); const text = await res.text(); const content = text.match(/<main>([\s\S]*?)</main>/i)[1]; setTimeout(() => { main.innerHTML = content; main.style.opacity = 1; }, 300); } catch (err) { main.innerHTML = '<p>Erreur de chargement de la page.</p>'; } }

// 🔁 Prise en compte du bouton retour du navigateur window.addEventListener('popstate', () => { const page = window.location.pathname.split('/').pop().replace('.html', '') || 'index'; loadPage(page); });

// 🔃 Chargement initial si l’utilisateur arrive directement sur une autre page document.addEventListener('DOMContentLoaded', () => { const page = window.location.pathname.split('/').pop().replace('.html', '') || 'index'; loadPage(page); });

