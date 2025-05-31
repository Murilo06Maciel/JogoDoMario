const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const scoreElement = document.getElementById('score');
const startBtn = document.getElementById('start-btn');

let score = 0;
let pipesJumped = 0;
let pipeSpeed = 3;
let canScore = true;
let loop = null;
let gameStarted = false;

const updateScore = () => {
    score++;
    scoreElement.textContent = `Pontos: ${score}`;
};

const jump = () => {
    if (!gameStarted) return;
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

function startGame() {
    if (gameStarted) return;
    gameStarted = true;
    startBtn.style.display = 'none';
    score = 0;
    pipesJumped = 0;
    pipeSpeed = 3;
    canScore = true;
    scoreElement.textContent = 'Pontos: 0';

    // Reset Mario
    mario.src = './images/mario.gif';
    mario.style.bottom = '0';
    mario.style.left = '';
    mario.style.width = '150px';
    mario.style.marginLeft = '';
    mario.classList.remove('game-over-jump');
    mario.classList.remove('jump');
    mario.style.animation = ''; // <-- Adicione esta linha

    // Reset Pipe
    pipe.style.left = ''; // volta para o padrão do CSS
    pipe.style.animation = `pipe-animation ${pipeSpeed}s infinite linear`;
    pipe.style.animationDuration = `${pipeSpeed}s`;

    // Reset Clouds
    clouds.style.left = '';
    clouds.style.animation = 'clouds-animation 15s infinite linear';

    // Limpa loop anterior se existir
    if (loop) clearInterval(loop);

    loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
        const cloudsPosition = clouds.offsetLeft;

        if (pipePosition < 0 && canScore) {
            pipesJumped++;
            updateScore();
            canScore = false;
            if (pipesJumped % 10 === 0) {
                pipeSpeed *= 0.9975;
                pipe.style.animationDuration = `${pipeSpeed}s`;
            }
        }
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
            gameStarted = false;
            startBtn.style.display = 'block';
            startBtn.textContent = 'Reiniciar';
        }
    }, 10);
}

startBtn.addEventListener('click', startGame);
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' || event.code === 'ArrowUp') {
        jump();
    }
});