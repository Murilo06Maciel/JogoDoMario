const bowser = document.querySelector('.bowser');

function animarBowser() {
    // Bowser começa fora da tela à direita
    bowser.src = './images/bowserandando.gif';
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
            bowser.src = './images/bowserparado.gif';

            // Espera 1.5s, faz animação especial
            setTimeout(() => {
                bowser.src = './images/bowseranimacao.gif';

                // Depois volta a andar para a direita
                setTimeout(() => {
                    bowser.src = './images/bowserandando.gif';
                    bowser.style.transform = 'scaleX(-1)'; // olhando para a direita
                    bowser.style.left = '100%';

                    // Quando quase sair da tela, ataca
                    setTimeout(() => {
                        bowser.style.transform = 'scaleX(1)'; // olha para o Mario
                        bowser.src = './images/bowserataque.gif';

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