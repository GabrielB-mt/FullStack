let canvas = document.getElementById('canvas1');
let ctx1 = canvas1.getContext('2d')



// Nave Jogador


// Jogo State
let infos_jogo = {
    player: {
        x: canvas.width/2 - 5,
        y: 670,
        velocidade: 2,
        balas: [],
    },
    inimigos: [],
    inimigo_balas: [],
    teclas: [],
    game_over: false
    
};
let ultimaBala = 0;
const intervaloBala = 200;

// Controle de balas

class Bala {
    constructor(x, y, inimigo = false){
        this.x = x,
        this.y = y,
        this.raio = 3,
        this.velocidade = inimigo ? 2 : -2
        this.inimigo = inimigo
}

    desenhar() {
        ctx1.beginPath();
        ctx1.fillStyle = this.inimigo ? '#28c7f7' : '#ffdb29';
        ctx1.strokeStyle = 'transparent';
        ctx1.arc(this.x,this.y,3,0*Math.PI,2*Math.PI);
        ctx1.fill();
    }

    mov_bala() {
        this.y += this.velocidade
    }


}

// Controle de Inimigos

class Inimigo{
    constructor(x, y){
        this.x = x+10,
        this.y = y+10,
        this.velocidade = 1
        this.intervaloBala = 60
        this.contadorBala = 0
    }

    desenhar() {
        ctx1.fillStyle = 'red'
        ctx1.strokeStyle = 'black'
        ctx1.fillRect(this.x, this.y, 20, 20)
        ctx1.strokeRect(this.x, this.y, 20, 20)
    }

    mover() {
        this.y += this.velocidade;
        this.contadorBala++;
        if (this.contadorBala >= this.intervaloBala) {
        this.atirar();
        this.contadorBala = 0;
        }
    }
    atirar() {
        infos_jogo.inimigo_balas.push(new Bala(this.x + 10, this.y + 20, true));
    }
}


function desenharPlayer() {
    ctx1.fillStyle = '#dc6ae2'
    ctx1.strokeStyle = 'blue'
    ctx1.fillRect(infos_jogo.player.x, infos_jogo.player.y, 10, 10)
    ctx1.strokeRect(infos_jogo.player.x, infos_jogo.player.y, 10, 10)
}

function movePlayer() {
    if (infos_jogo.teclas.includes('ArrowUp')){
        infos_jogo.player.y += -infos_jogo.player.velocidade
    }
    if (infos_jogo.teclas.includes('ArrowDown')){
        infos_jogo.player.y += infos_jogo.player.velocidade
    }
    if (infos_jogo.teclas.includes('ArrowRight')){
        infos_jogo.player.x += infos_jogo.player.velocidade
    }
    if (infos_jogo.teclas.includes('ArrowLeft')){
        infos_jogo.player.x += -infos_jogo.player.velocidade
    }

    if(infos_jogo.player.x < 0){infos_jogo.player.x = 0}
    if(infos_jogo.player.x > 440){infos_jogo.player.x = 440}
    if(infos_jogo.player.y < 0){infos_jogo.player.y = 0}
    if(infos_jogo.player.y > 690){infos_jogo.player.y = 690}
}


function adicionarBalas() {
    infos_jogo.player.balas.push(new Bala(infos_jogo.player.x + 5, infos_jogo.player.y))
}

function atualizarBalas() {
    // Player
    infos_jogo.player.balas = infos_jogo.player.balas.filter(bala => {
        bala.mov_bala();
        infos_jogo.inimigos = infos_jogo.inimigos.filter(inimigo => {
            if (verificarColisao(bala, inimigo)) {
                return false;
            }
            return true;
        });
        return bala.y > 0;
    });

    // Inimigo
    infos_jogo.inimigo_balas = infos_jogo.inimigo_balas.filter(bala => {
        bala.mov_bala();

        
        if (!infos_jogo.game_over && verificarColisao(bala, {
            x: infos_jogo.player.x,
            y: infos_jogo.player.y,
            largura: 10,
            altura: 10
        })) {
            infos_jogo.game_over = true; 
        }

        return bala.y < canvas.height;
    });
}


function verificarColisao(bala, objeto) {
    
    let distanciaX = bala.x - (objeto.x + 10);
    let distanciaY = bala.y - (objeto.y + 10);

    
    let distancia = Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);

    return distancia < bala.raio + 10;
}



function atualizarInimigos() {
        infos_jogo.inimigos = infos_jogo.inimigos.filter(inimigo => {
            inimigo.mover();
            return inimigo.y < canvas.height;
        });
    }

function desenhar() {
    ctx1.clearRect(0,0,450,700)
    desenharPlayer()
    infos_jogo.player.balas.forEach(bala => bala.desenhar());
    infos_jogo.inimigo_balas.forEach(bala => bala.desenhar());
    infos_jogo.inimigos.forEach(inimigo => inimigo.desenhar());
}

function fase1(){
infos_jogo.inimigos.push(new Inimigo(canvas.width/2, 100))

}


function loopJogo() {
    movePlayer();
    atualizarBalas();
    atualizarInimigos();
    desenhar();
    if (infos_jogo.teclas.includes('z')) {
        let agora = Date.now();
        if (agora - ultimaBala > intervaloBala) {
            adicionarBalas();
            ultimaBala = agora;
        }
    }
    if(infos_jogo.game_over){
        console.log("Game Over!")
        return}
    requestAnimationFrame(loopJogo);
}

let balaIntervalo = null;

document.addEventListener('keydown', function(evento){
    let tecla = evento.key;
    if (infos_jogo.teclas.includes(tecla) == false){infos_jogo.teclas.push(tecla)}
    if (tecla === 'z' && !infos_jogo.teclas.includes('z')) {
        infos_jogo.teclas.push('z');
    }
}) 

document.addEventListener('keyup', function(evento2){
    let tecla = evento2.key;
    let index = infos_jogo.teclas.indexOf(tecla)
    if (index > -1) {
        infos_jogo.teclas.splice(index, 1); 
    }
});

loopJogo();
fase1();





// Código feito e modificado com base em: https://codigofacil.com.br/criar-jogo-em-javascript/