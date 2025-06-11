const bowser = document.querySelector('.bowser');
let bowserAppeared = false; // Variável para controlar se o Bowser já apareceu

function checkBowserAppearance() {
    if (score >= 2 && !bowserAppeared) {
        bowserAppeared = true; // Marca que o Bowser já apareceu
        animarBowser(); // Chama a função de animação do Bowser
    }
}

// Modifique sua função de atualização de pontos para incluir esta verificação
function updateScore() {
    score++;
    scoreDisplay.textContent = score;
    checkBowserAppearance(); // Verifica se o Bowser deve aparecer
    chooseObstacle(); // Mantém a lógica original de obstáculos
}

function animarBowser() {
    // Bowser começa fora da tela à direita
    bowser.src = './images/bowser_Vindo.gif';
    bowser.style.display = 'block';
    bowser.style.position = 'absolute';
    bowser.style.left = '100%';
    bowser.style.bottom = '0';
    bowser.style.transform = 'scaleX(1)'; // olhando para a esquerda

    // Move Bowser até 60% da tela (ajuste conforme desejar)
    setTimeout(() => {
        bowser.style.transition = 'left 2s linear';
        bowser.style.left = '60%';

        // Quando chegar, troca para parado
        setTimeout(() => {
            bowser.src = './images/bowser_Parado.gif';

            // Espera 1.5s, faz animação especial
            setTimeout(() => {
                bowser.src = './images/bowser_Animacao.gif';

                // Depois volta a andar para a direita
                setTimeout(() => {
                    bowser.src = './images/bowser_Vindo.gif';
                    bowser.style.transform = 'scaleX(-1)'; // olhando para a direita
                    bowser.style.left = '100%';

                    // Quando quase sair da tela, ataca
                    setTimeout(() => {
                        bowser.style.transform = 'scaleX(1)'; // olha para o Mario
                        bowser.src = './images/bowser cuspindo.gif';

                        // Exemplo: bolas de fogo (se existirem)
                        // const bolaTop = document.querySelector('.boladefogo-top');
                        // const bolaBottom = document.querySelector('.boladefogo-bottom');
                        // bolaTop.style.display = 'block';
                        // bolaBottom.style.display = 'block';

                        // Depois de atacar, Bowser sai da tela
                        setTimeout(() => {
                            bowser.style.left = '110%';
                            setTimeout(() => {
                                bowser.style.display = 'none';
                                // Aqui pode chamar a próxima fase, se quiser
                                // if (typeof startBossPhase === 'function') startBossPhase();
                            }, 700);
                        }, 700);
                    }, 2000);
                }, 2000);
            }, 1500);
        }, 2000);
    }, 100); // Pequeno delay para garantir que o CSS transition funcione
}