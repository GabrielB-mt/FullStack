let canvas = document.getElementById('canvas1');
let ctx1 = canvas1.getContext('2d')





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
let faseAtual = 0

// Controle de balas

class Bala {
    constructor(x, y, inimigo = false){
        this.x = x,
        this.y = y,
        this.raio = 3,
        this.velocidade = inimigo ? 3 : -3
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

// Player

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
        let acerto = false;
        infos_jogo.inimigos = infos_jogo.inimigos.filter(inimigo => {
            if (verificarColisao(bala, inimigo)) {
                acerto = true;
                return false;
            }
            return true;
        });
        return !acerto && bala.y > 0;
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
    
    return(
        bala.x > objeto.x &&
        bala.x < objeto.x + (objeto.largura || 20) &&
        bala.y > objeto.y &&
        bala.y < objeto.y + (objeto.altura || 20)

    )
}

function faseTexto(fase){
    ctx1.beginPath();
    ctx1.fillStyle = 'red';
    ctx1.font = "25px Impact";
    ctx1.textAlign = "left";
    ctx1.fillText("Fase " +fase,5,25);
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
    faseTexto(faseAtual)
}

function fase1(){
infos_jogo.inimigos.push(new Inimigo(canvas.width/2, 100))

}

let fases = [
    {   
        fase: 1,
        timeout: 0,
        inimigos: [ 
            {x: 50, intervaloBala: 100},
            {x: 100, intervaloBala: 100},
            {x: 150, intervaloBala: 100},
            {x: 200, intervaloBala: 100},
            {x: 250, intervaloBala: 100},
            {x: 300, intervaloBala: 100},

        ]

    },
    {   
        fase: 1,
        timeout: 7500,
        inimigos: [
            {x: 50, intervaloBala: 90},
            {x: 100, intervaloBala: 90},
            {x: 150, intervaloBala: 90},
            {x: 200, intervaloBala: 90},
            {x: 250, intervaloBala: 90},
            {x: 300, intervaloBala: 90},

        ]
    },
    {   
        fase: 1,
        timeout: 15000,
        inimigos: [
            {x: 0, intervaloBala: 80},
            {x: 50, intervaloBala: 80},
            {x: 100, intervaloBala: 80},
            {x: 150, intervaloBala: 80},
            {x: 200, intervaloBala: 80},
            {x: 250, intervaloBala: 80},
            {x: 300, intervaloBala: 80},
            {x: 350, intervaloBala: 80},
        ]
    },
    {   
        fase: 1,
        timeout: 22500,
        inimigos: [
            {x: 50, intervaloBala: 75},
            {x: 100, intervaloBala: 75},
            {x: 150, intervaloBala: 75},
            {x: 200, intervaloBala: 75},
            {x: 250, intervaloBala: 75},
            {x: 300, intervaloBala: 75},
        ]
    },
    {
        fase:2,
        timeout: 32000,
        inimigos: [
            {x: 0, intervaloBala: 80},
            {x: 50, intervaloBala: 80},
            {x: 100, intervaloBala: 80},
            {x: 150, intervaloBala: 80},
            {x: 200, intervaloBala: 80},
            {x: 250, intervaloBala: 80},
            {x: 300, intervaloBala: 80},
            {x: 350, intervaloBala: 80},
            {x: 400, intervaloBala: 80},
        ]
        
    },
    {
        fase:2,
        timeout: 32500,
        inimigos: [
            {x: 25, intervaloBala: 75},
            {x: 75, intervaloBala: 75},
            {x: 125, intervaloBala: 75},
            {x: 175, intervaloBala: 75},
            {x: 225, intervaloBala: 75},
            {x: 275, intervaloBala: 75},
            {x: 325, intervaloBala: 75},
            {x: 375, intervaloBala: 75},
            {x: 425, intervaloBala: 75},
        ]
        
    },
    {
        fase:2,
        timeout: 37000,
        inimigos: [
            {x: 0, intervaloBala: 75},
            {x: 50, intervaloBala: 75},
            {x: 100, intervaloBala: 75},
            {x: 150, intervaloBala: 75},
            {x: 200, intervaloBala: 75},
            {x: 250, intervaloBala: 75},
            {x: 300, intervaloBala: 75},
            {x: 350, intervaloBala: 75},
            {x: 400, intervaloBala: 75},
        ]
        
    },
    {
        fase:2,
        timeout: 42000,
        inimigos: [
            {x: 0, intervaloBala: 65},
            {x: 50, intervaloBala: 65},
            {x: 100, intervaloBala: 65},
            {x: 150, intervaloBala: 65},
            {x: 200, intervaloBala: 65},
            {x: 250, intervaloBala: 65},
            {x: 300, intervaloBala: 65},
            {x: 350, intervaloBala: 65},
            {x: 400, intervaloBala: 65},
        ]
        
    },
    {
        fase:2,
        timeout: 47000,
        inimigos: [
            {x: 0, intervaloBala: 65},
            {x: 25, intervaloBala: 65},
            {x: 50, intervaloBala: 65},
            {x: 100, intervaloBala: 65},
            {x: 150, intervaloBala: 65},
            {x: 200, intervaloBala: 65},
            {x: 250, intervaloBala: 65},
            {x: 300, intervaloBala: 65},
            {x: 350, intervaloBala: 65},
            {x: 375, intervaloBala: 65},
            {x: 400, intervaloBala: 65},
        ]
        
    },

    {
        fase:2,
        timeout: 52000,
        inimigos: [
            {x: 0, intervaloBala: 55},
            {x: 25, intervaloBala: 55},
            {x: 50, intervaloBala: 55},
            {x: 100, intervaloBala: 55},
            {x: 150, intervaloBala: 55},
            {x: 175, intervaloBala: 55},
            {x: 200, intervaloBala: 55},
            {x: 250, intervaloBala: 55},
            {x: 300, intervaloBala: 55},
            {x: 350, intervaloBala: 55},
            {x: 375, intervaloBala: 55},
            {x: 400, intervaloBala: 55},
        ]
        
    },
    
    

] 

function rodarFase(){
    fases.forEach(fase =>{
        setTimeout(() =>{
            faseAtual = fase.fase
            fase.inimigos.forEach(config =>{
                let inimigo = new Inimigo(config.x,0);
                inimigo.intervaloBala = config.intervaloBala;
                infos_jogo.inimigos.push(inimigo);
            });
        }, fase.timeout);
    });
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
rodarFase();





// Código feito e modificado com base em: https://codigofacil.com.br/criar-jogo-em-javascript/