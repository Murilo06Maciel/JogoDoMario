function atirarBolaDeFogo() {
    if (!gameStarted) return;

    // Cria a bola de fogo
    const bola = document.createElement('img');
    bola.src = './images/bola_de_fogo.gif';
    bola.className = 'bola-de-fogo';

    // Define posição inicial baseada no Mario
    bola.style.position = 'absolute';
    bola.style.left = (mario.offsetLeft + mario.offsetWidth - 10) + 'px';
    bola.style.bottom = (parseInt(window.getComputedStyle(mario).bottom) + 60) + 'px';
    bola.style.width = '50px';
    bola.style.height = '50px';
    bola.style.zIndex = 3;

    document.querySelector('.game-board').appendChild(bola);

    // Animação simples para mover a bola para a direita
    let pos = mario.offsetLeft + mario.offsetWidth - 10;
    const moveInterval = setInterval(() => {
        pos += 15; // velocidade
        bola.style.left = pos + 'px';

        // Verifica colisão com o Koopa
        const koopaRect = koopa.getBoundingClientRect();
        const bolaRect = bola.getBoundingClientRect();
        if (
            koopa.style.display === 'block' &&
            bolaRect.right > koopaRect.left &&
            bolaRect.left < koopaRect.right &&
            bolaRect.bottom > koopaRect.top &&
            bolaRect.top < koopaRect.bottom
        ) {
            // Faz o Koopa sumir/morrer
            koopa.style.display = 'none';
            koopa.style.animation = 'none';
            bola.remove();
            clearInterval(moveInterval);
        }

        // Remove a bola se sair da tela
        if (pos > document.querySelector('.game-board').offsetWidth) {
            bola.remove();
            clearInterval(moveInterval);
        }
    }, 16);
}

// Adiciona o evento para atirar com a seta para a direita
document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowRight' && gameStarted) {
        atirarBolaDeFogo();
    }
});

function chooseObstacle() {
    if (typeof bowserAnimationActive !== "undefined" && bowserAnimationActive) {
        pipe.style.display = 'none';
        bill.style.display = 'none';
        koopa.style.display = 'none';
        return;
    }
    if (!bowserAppeared) {
        currentObstacle = 'pipe';
        pipe.style.display = 'block';
        pipe.style.animation = `pipe-animation ${pipeSpeed}s infinite linear`;
        koopa.style.display = 'none';
        koopa.style.animation = 'none';
    } else {
        const sorteio = Math.random() < 0.5 ? 'pipe' : 'koopa';
        currentObstacle = sorteio;
        if (sorteio === 'pipe') {
            pipe.style.display = 'block';
            pipe.style.animation = `pipe-animation ${pipeSpeed}s infinite linear`;
            koopa.style.display = 'none';
            koopa.style.animation = 'none';
        } else {
            koopa.style.display = 'block';
            koopa.style.animation = `koopa-animation ${pipeSpeed + 1}s infinite linear`;
            koopa.style.height = '80px'; // Ajusta a altura do Koopa
            pipe.style.display = 'none';
            pipe.style.animation = 'none';
        }
    }
}