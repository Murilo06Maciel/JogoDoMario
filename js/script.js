const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const scoreElement = document.getElementById('score');
let score = 0;
let pipesJumped = 0;
let pipeSpeed = 3; // segundos (velocidade inicial do cano)

const updateScore = () => {
    score++;
    scoreElement.textContent = `Pontos: ${score}`;
};

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

let canScore = true;

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    const cloudsPosition = clouds.offsetLeft;

    // Detecta se o Mario pulou o cano (passou pelo cano com sucesso)
    if (pipePosition < 0 && canScore) {
        pipesJumped++;
        updateScore(); // Pontua ao passar pelo cano
        canScore = false;

        // A cada 10 canos pulados, aumenta a velocidade em 0.25%
        if (pipesJumped % 10 === 0) {
            pipeSpeed *= 0.9975; // diminui o tempo da animação em 0.25%
            pipe.style.animationDuration = `${pipeSpeed}s`;
        }
    }

    // Permite pontuar novamente quando o cano volta para a direita
    if (pipePosition > 120) {
        canScore = true;
    }

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = 'none';
        pipe.style.left =  `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom =  `${pipePosition}px`;

        mario.src = './images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';
        mario.classList.add('game-over-jump');

        clouds.style.animation = 'none';
        clouds.style.left = `${cloudsPosition}px`;

        clearInterval(loop);
    }
}, 10);

pipe.style.animationDuration = `${pipeSpeed}s`;

document.addEventListener('keydown', jump);