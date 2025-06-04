const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const scoreElement = document.getElementById('score');
const startBtn = document.getElementById('start-btn');
const bill = document.querySelector('.bill');
const koopa = document.querySelector('.koopa');


let score = 0;
let pipesJumped = 0;
let pipeSpeed = 3;
let canScore = true;
let loop = null;
let gameStarted = false;
let currentObstacle = 'pipe'; // 'pipe' ou 'bill'

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

function chooseObstacle() {
    if (score < 25) {
        currentObstacle = 'pipe';
        pipe.style.display = 'block';
        pipe.style.animation = `pipe-animation ${pipeSpeed}s infinite linear`;
        bill.style.display = 'none';
        bill.style.animation = 'none';
        koopa.style.display = 'none';
        koopa.style.animation = 'none';
    } else {
        // Sorteia entre pipe, bill e koopa
        const obstacles = ['pipe', 'bill', 'koopa'];
        currentObstacle = obstacles[Math.floor(Math.random() * obstacles.length)];
        if (currentObstacle === 'pipe') {
            pipe.style.display = 'block';
            pipe.style.animation = `pipe-animation ${pipeSpeed}s infinite linear`;
            bill.style.display = 'none';
            bill.style.animation = 'none';
            koopa.style.display = 'none';
            koopa.style.animation = 'none';
        } else if (currentObstacle === 'bill') {
            bill.style.display = 'block';
            bill.style.animation = 'bill-animation 1s infinite linear';
            pipe.style.display = 'none';
            pipe.style.animation = 'none';
            koopa.style.display = 'none';
            koopa.style.animation = 'none';
        } else if (currentObstacle === 'koopa') {
            koopa.style.display = 'block';
            koopa.style.animation = 'koopa-animation 2s infinite linear';
            pipe.style.display = 'none';
            pipe.style.animation = 'none';
            bill.style.display = 'none';
            bill.style.animation = 'none';
        }
    }
}

function startGame() {
    if (loop) clearInterval(loop); // Limpa qualquer loop anterior

    // Reset variáveis
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
    mario.classList.remove('crouch');
    mario.style.animation = '';

    // Reset Pipe
    pipe.style.display = 'block';
    pipe.style.left = '';
    pipe.style.animation = `pipe-animation ${pipeSpeed}s infinite linear`;

    // Reset Bill
    bill.style.display = 'none';
    bill.style.right = '-200px';
    bill.style.animation = 'none';

    // Reset Clouds
    clouds.style.left = '';
    clouds.style.animation = 'clouds-animation 15s infinite linear';

    // Escolhe obstáculo inicial
    chooseObstacle();

    loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
        const cloudsPosition = clouds.offsetLeft;
        const billPosition = bill.offsetLeft;

        // PIPE
        if (currentObstacle === 'pipe') {
            if (pipePosition < 0 && canScore) {
                pipesJumped++;
                updateScore();
                canScore = false;
                if (pipesJumped % 5 === 0) {
                    pipeSpeed *= 0.9975;
                }
                // Troca obstáculo ao passar
                chooseObstacle();
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
        }

        // BILL
        if (currentObstacle === 'bill') {
            if (billPosition < 0 && canScore) {
                pipesJumped++;
                updateScore();
                canScore = false;
                // Troca obstáculo ao passar
                chooseObstacle();
            }
            if (billPosition > 120) {
                canScore = true;
            }
            // Colisão com o Bill (apenas se Mario não estiver agachado)
            if (
                billPosition > 0 && billPosition < 150 &&
                !mario.classList.contains('crouch')
            ) {
                bill.style.animation = 'none';
                bill.style.right = `${billPosition}px`;
                mario.style.animation = 'none';
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
        }

        // KOOPA
        if (currentObstacle === 'koopa') {
            const koopaPosition = koopa.offsetLeft;
            if (koopaPosition < 0 && canScore) {
                pipesJumped++;
                updateScore();
                canScore = false;
                // Troca obstáculo ao passar
                chooseObstacle();
            }
            if (koopaPosition > 120) {
                canScore = true;
            }
            // Colisão com o Koopa
            if (
                koopaPosition > 0 && koopaPosition < 150 &&
                mario.offsetTop + mario.offsetHeight > koopa.offsetTop // colisão simples
            ) {
                koopa.style.animation = 'none';
                koopa.style.right = `${koopaPosition}px`;
                mario.style.animation = 'none';
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
        }
    }, 10);
}

startBtn.addEventListener('click', startGame);
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' || event.code === 'ArrowUp') {
        jump();
    }
    if (event.code === 'ArrowDown' && gameStarted) {
        mario.classList.add('crouch');
        mario.src = './images/mario-agachado.png';
    }
});

document.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowDown' && gameStarted) {
        mario.classList.remove('crouch');
        mario.src = './images/mario.gif';
    }
});