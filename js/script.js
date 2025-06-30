// Animation d'intro Primordium Catering
const intro = document.getElementById('intro-animation');
const main = document.getElementById('main-content');
const skipBtn = document.getElementById('skip-btn');
const canvas = document.getElementById('animation-canvas');
const ctx = canvas.getContext('2d');

// Responsive canvas sizing
function resizeCanvas() {
    let size = Math.min(window.innerWidth * 0.75, window.innerHeight * 0.65, 450);
    canvas.width = size;
    canvas.height = size;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Animation data
let startTime;
let done = false;

function drawAnimation(ts) {
    if (!startTime) startTime = ts;
    const t = (ts - startTime) / 1000; // secondes

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width, h = canvas.height;
    const centerX = w/2, baseY = h*0.83;

    // 1. Ligne dorée (racine) qui pousse
    ctx.save();
    ctx.strokeStyle = "#C8A14F";
    ctx.lineWidth = 7 + 5*Math.sin(t*1.1);
    ctx.beginPath();
    let len = Math.min(1, t/0.8); // pousse en 0.8s
    ctx.moveTo(centerX, baseY);
    ctx.lineTo(centerX, baseY - len*h*0.47);
    ctx.stroke();
    ctx.restore();

    // 2. Petite graine (apparition dès 0.4s)
    if (t > 0.4) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, baseY, 14, 0, 2 * Math.PI);
        ctx.fillStyle = "#C8A14F";
        ctx.shadowColor = "#b2973a";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
    }

    // 3. Tige et racines (courbes, dès 1.2s)
    if (t > 1.2) {
        ctx.save();
        ctx.strokeStyle = "#C8A14F";
        ctx.lineWidth = 5;
        ctx.beginPath();
        // tige
        ctx.moveTo(centerX, baseY - h*0.47);
        ctx.bezierCurveTo(centerX, baseY - h*0.66, centerX-18, baseY-h*0.83, centerX, baseY-h*0.88);
        ctx.stroke();

        // racines
        ctx.lineWidth = 2.3;
        ctx.beginPath();
        ctx.moveTo(centerX, baseY);
        ctx.bezierCurveTo(centerX-19, baseY+26, centerX-39, baseY+15, centerX-40, baseY+35);
        ctx.moveTo(centerX, baseY);
        ctx.bezierCurveTo(centerX+23, baseY+20, centerX+40, baseY+11, centerX+43, baseY+37);
        ctx.stroke();
        ctx.restore();
    }

    // 4. Feuille torsadée (après 1.7s)
    if (t > 1.7) {
        ctx.save();
        ctx.strokeStyle = "#1D372F";
        ctx.lineWidth = 2.7;
        ctx.beginPath();
        ctx.moveTo(centerX, baseY-h*0.76);
        ctx.bezierCurveTo(centerX+15, baseY-h*0.89, centerX-19, baseY-h*0.95, centerX+8, baseY-h*1.03);
        ctx.stroke();

        // mini-fourchette stylisée au bout
        let fx = centerX+8, fy = baseY-h*1.03;
        ctx.lineWidth = 1.2;
        for(let i=0; i<3; i++){
            ctx.beginPath();
            ctx.moveTo(fx-3+i*3, fy);
            ctx.lineTo(fx-3+i*3, fy-8);
            ctx.stroke();
        }
        ctx.restore();
    }

    // 5. Six points dorés (après 2.2s)
    if (t > 2.2) {
        ctx.save();
        ctx.fillStyle = "#C8A14F";
        let r = 6.2, angle0 = Math.PI/2.8;
        for(let i=0; i<6; i++){
            let angle = angle0 + i*Math.PI/7.2;
            let px = centerX + Math.cos(angle)*45;
            let py = baseY-h*0.68 + Math.sin(angle)*14;
            ctx.beginPath();
            ctx.arc(px, py, r, 0, 2 * Math.PI);
            ctx.fill();
        }
        ctx.restore();
    }

    // 6. Texte "Primordium Catering" (après 2.7s)
    if (t > 2.7) {
        ctx.save();
        ctx.font = `${Math.floor(h/13)}px 'Playfair Display', serif`;
        ctx.fillStyle = "#1D372F";
        ctx.textAlign = "center";
        ctx.globalAlpha = Math.min(1, (t-2.7)/0.6);
        ctx.fillText("Primordium Catering", centerX, baseY-h*0.52);
        ctx.restore();
    }

    // 7. Slogan (après 3.3s)
    if (t > 3.3) {
        ctx.save();
        ctx.font = `${Math.floor(h/22)}px 'Playfair Display', serif`;
        ctx.fillStyle = "#C8A14F";
        ctx.textAlign = "center";
        ctx.globalAlpha = Math.min(1, (t-3.3)/0.7);
        ctx.fillText("Du goût, du sens.", centerX, baseY-h*0.46);
        ctx.restore();
    }

    // 8. Fin & transition (après 5.2s)
    if (t < 5.2 && !done) {
        requestAnimationFrame(drawAnimation);
    } else if (!done) {
        done = true;
        intro.style.opacity = 0;
        setTimeout(() => {
            intro.style.display = 'none';
            main.style.display = 'block';
        }, 1100);
    }
}

// Skip bouton
skipBtn.addEventListener('click', () => {
    done = true;
    intro.style.opacity = 0;
    setTimeout(() => {
        intro.style.display = 'none';
        main.style.display = 'block';
    }, 500);
});

// Lancer l’animation
window.addEventListener('load', () => {
    main.style.display = 'none';
    intro.style.opacity = 1;
    intro.style.display = 'flex';
    done = false;
    startTime = undefined;
    requestAnimationFrame(drawAnimation);
});
