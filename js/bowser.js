const bowser = document.querySelector('.bowser');
let bowserAppeared = false;

function checkBowserAppearance(currentScore) {
    if (currentScore >= 2 && !bowserAppeared) {
        bowserAppeared = true;
        pauseGameForBowser();
        animarBowser();
    }
}

function pauseGameForBowser() {
    // Pausa todos os obstáculos
    pipe.style.animation = 'none';
    bill.style.animation = 'none';
    koopa.style.animation = 'none';
    pipe.style.display = 'none';
    bill.style.display = 'none';
    koopa.style.display = 'none';
    
    // Pausa as nuvens
    clouds.style.animation = 'none';
}

function resumeGameAfterBowser() {
    // Reativa o jogo normal
    chooseObstacle();
    clouds.style.animation = 'clouds-animation 15s infinite linear';
}

function animarBowser() {
    bowser.src = './images/bowser_Vindo.gif';
    bowser.style.display = 'block';
    bowser.style.position = 'absolute';
    bowser.style.left = '100%';
    bowser.style.bottom = '0';
    bowser.style.transform = 'scaleX(1)';
    bowser.style.zIndex = '100';

    setTimeout(() => {
        bowser.style.transition = 'left 2s linear';
        bowser.style.left = '60%';

        setTimeout(() => {
            bowser.src = './images/browser_Parado.gif';

            setTimeout(() => {
                bowser.src = './images/browser_Animacao.gif';

                setTimeout(() => {
                    bowser.src = './images/bowser_Vindo.gif';
                    bowser.style.transform = 'scaleX(-1)';
                    bowser.style.left = '100%';

                    setTimeout(() => {
                        bowser.style.transform = 'scaleX(1)';
                        bowser.src = './images/browser_Ataque.gif';

                        setTimeout(() => {
                            bowser.style.left = '110%';
                            setTimeout(() => {
                                bowser.style.display = 'none';
                                resumeGameAfterBowser();
                            }, 700);
                        }, 700);
                    }, 2000);
                }, 2000);
            }, 1500);
        }, 2000);
    }, 100);
}