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

        // Apenas animação, não destrói inimigos

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