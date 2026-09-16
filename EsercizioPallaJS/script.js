const campo = document.getElementById("campo");
const palla = document.getElementById("palla");
const ostacolo = document.getElementById("ostacolo");
const bottone = document.getElementById("startStop");
const contatoreTesto = document.getElementById("contatore");

let x = 20;
let y = 20;

let velocitaX = 3;
let velocitaY = 3;

let rimbalzi = 0;

let giocoAttivo = false;
let animazione;

bottone.addEventListener("click", function () {
    if (!giocoAttivo) {
        giocoAttivo = true;
        bottone.textContent = "Stop";
        muoviPalla();
    } else {
        giocoAttivo = false;
        bottone.textContent = "Start";
        cancelAnimationFrame(animazione);
    }
});

function muoviPalla() {
    if (!giocoAttivo) return;

    x += velocitaX;
    y += velocitaY;

    let larghezzaCampo = campo.clientWidth;
    let altezzaCampo = campo.clientHeight;

    let larghezzaPalla = palla.offsetWidth;
    let altezzaPalla = palla.offsetHeight;

    // Controllo bordi sinistra/destra
    if (x <= 0 || x + larghezzaPalla >= larghezzaCampo) {
        velocitaX *= -1;
        rimbalzi++;
        aggiornaContatore();
    }

    // Controllo bordi alto/basso
    if (y <= 0 || y + altezzaPalla >= altezzaCampo) {
        velocitaY *= -1;
        rimbalzi++;
        aggiornaContatore();
    }

    palla.style.left = x + "px";
    palla.style.top = y + "px";

    controllaOstacolo();

    animazione = requestAnimationFrame(muoviPalla);
}

function aggiornaContatore() {
    contatoreTesto.textContent = "Rimbalzi: " + rimbalzi;
}

function controllaOstacolo() {
    let p = palla.getBoundingClientRect();
    let o = ostacolo.getBoundingClientRect();

    if (
        p.right >= o.left &&
        p.left <= o.right &&
        p.bottom >= o.top &&
        p.top <= o.bottom
    ) {
        cambiaColore();
        velocitaX *= -1;
        velocitaY *= -1;
    }
}

function cambiaColore() {
    let coloreCasuale = "#" + Math.floor(Math.random() * 16777215).toString(16);
    palla.style.backgroundColor = coloreCasuale;
}