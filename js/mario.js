// mario.js
function jump() {
    if (!gameStarted) return;
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

function agacharMario() {
    mario.classList.add('crouch');
    mario.src = './images/mario-agachado.png';
}

function levantarMario() {
    mario.classList.remove('crouch');
    mario.src = './images/mario.gif';
}