let canvas = document.getElementById('canvas1');
let ctx1 = canvas.getContext('2d')



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
    game_over: false,
    pontuacao: 0
    
};
let ultimaBala = 0;
const intervaloBala = 200;
let faseAtual = 0
let boss = null
let imagemNave = new Image();
imagemNave.src ='./sprites/nave_player.png'
let imagemInimigo = new Image();
imagemInimigo.src = './sprites/inimigo.png'
let imagemBoss = new Image();
imagemBoss.src = './sprites/boss.png'
let lua = new Image();
lua.src = './sprites/aoi_tsuki.png';
let luaY = -canvas.height;
// Controle de balas

class Bala {
    constructor(x, y, inimigo = false, diagonal = false, direcao_diagonal=1){
        this.x = x,
        this.y = y,
        this.raio = 3,
        this.velocidade = inimigo ? 3 : -5 // Se tiver tag de inimigo, vai pra baixo com velocidade 3, se não, vai pra cima com velocidade 5
        this.inimigo = inimigo
        this.diagonal = diagonal                 //Define se a bala está indo ou não na diagonal
        this.direcao_diagonal = direcao_diagonal //e define sua direção
}

    desenhar() {
        ctx1.beginPath();
        ctx1.fillStyle = this.inimigo ? '#28c7f7' : '#ffdb29'; // Muda a cor da fala se for inimigo ou não
        ctx1.strokeStyle = 'transparent';
        ctx1.arc(this.x,this.y,3,0*Math.PI,2*Math.PI);
        ctx1.fill();
    }

    mov_bala() {
        this.y += this.velocidade
        if(this.diagonal){
            this.x += this.velocidade * this.direcao_diagonal * 0.5
        }
    }


}

// Controle de Inimigos

class Inimigo{
    constructor(x, y){
        this.x = x+Math.floor(Math.random()*20), //Adiciona um pouco de variação nos inimigos pro jogo ser mais difícil
        this.y = y+10,
        this.velocidade = 1
        this.intervaloBala = 60
        this.contadorBala = 0
    }

    desenhar() {
        ctx1.drawImage(imagemInimigo,this.x, this.y, 20, 20)
    }

    mover() {
        this.y += this.velocidade;
        this.contadorBala++;                                // Cada vez que o inimigo se move (a cada frame), o contador de bala é aumentado
        if (this.contadorBala >= this.intervaloBala) {      // quando o contador for maior que o intervalo informado (1s por padrão)                                           
        this.atirar();                                      // atira
        this.contadorBala = 0;
        }
    }
    atirar() {
        infos_jogo.inimigo_balas.push(new Bala(this.x + 10, this.y + 20, true));
    }
}
class Boss{
    constructor(x,y){
        this.x = x-50,
        this.y = y-100,
        this.velocidade = 0.5
        this.intervaloBala = 60
        this.contadorBala = 0
        this.vida = 500
    }
    desenhar(){
        ctx1.drawImage(imagemBoss,this.x, this.y, 100, 100)
    }
    
    mover() {
        if (this.y < 200){
            this.y += this.velocidade;
            luaY += this.velocidade
        }
        this.contadorBala++;
        if (this.contadorBala >= this.intervaloBala) {
        this.atirar();
        this.contadorBala = 0;
        }
    }

        atirar() {
        infos_jogo.inimigo_balas.push(new Bala(this.x + Math.floor(Math.random()*10), this.y + 100, true));
        infos_jogo.inimigo_balas.push(new Bala(this.x + 75 + Math.floor(Math.random()*10), this.y + 100, true));
        infos_jogo.inimigo_balas.push(new Bala(this.x + 50 + Math.floor(Math.random()*10), this.y + 100, true));
        infos_jogo.inimigo_balas.push(new Bala(this.x + 25 + Math.floor(Math.random()*10), this.y + 100, true)); //Atira muitas balas de uma vez
        infos_jogo.inimigo_balas.push(new Bala(this.x + 100+ Math.floor(Math.random()*10), this.y + 100, true)); //com variação
        infos_jogo.inimigo_balas.push(new Bala(this.x + 30, this.y + 100, true, true, -1));
        infos_jogo.inimigo_balas.push(new Bala(this.x + 70, this.y + 100, true, true, 1));                      //e na diagonal
        infos_jogo.inimigo_balas.push(new Bala(this.x + 30, this.y + 100, true, true, 1));
        infos_jogo.inimigo_balas.push(new Bala(this.x + 70, this.y + 100, true, true, -1));
    }

}


// Player

function desenharPlayer() {
    ctx1.fillStyle = '#dc6ae2'
    ctx1.fillRect(infos_jogo.player.x, infos_jogo.player.y, 10, 10)
    ctx1.drawImage(imagemNave, infos_jogo.player.x-5,infos_jogo.player.y-10,20,20)
}

function movePlayer() {
    if (infos_jogo.teclas.includes('ArrowUp')){
        infos_jogo.player.y += -infos_jogo.player.velocidade
    }
    if (infos_jogo.teclas.includes('ArrowDown')){
        infos_jogo.player.y += infos_jogo.player.velocidade
    }
    if (infos_jogo.teclas.includes('ArrowRight')){
        infos_jogo.player.x += infos_jogo.player.velocidade             //Usa o array com as teclas apertadas
    }                                                                   //Para melhor movimentação
    if (infos_jogo.teclas.includes('ArrowLeft')){
        infos_jogo.player.x += -infos_jogo.player.velocidade
    }

    if(infos_jogo.player.x < 5){infos_jogo.player.x = 5}
    if(infos_jogo.player.x > 435){infos_jogo.player.x = 435}            //Não permite que o player saia da tela
    if(infos_jogo.player.y < 10){infos_jogo.player.y = 10}
    if(infos_jogo.player.y > 690){infos_jogo.player.y = 690}
}


function adicionarBalas() {
    infos_jogo.player.balas.push(new Bala(infos_jogo.player.x + 5, infos_jogo.player.y)) //Adiciona bala à lista de balas
}

function atualizarBalas() {
    // Player
    infos_jogo.player.balas = infos_jogo.player.balas.filter(bala => {      //Filtra as balas com base na função de mover balas
        bala.mov_bala();
        let acerto = false;
        infos_jogo.inimigos = infos_jogo.inimigos.filter(inimigo => {
            if (verificarColisao(bala, inimigo)) {
                infos_jogo.pontuacao += 100                                 //Filtra as balas para desaparecerem quando acertam um oponente
                acerto = true;                                              //e aumenta os pontos do player
                return false;
            }
            return true;
        });
        return !acerto && bala.y > 0;                                       // filtra as que saem da tela
    },
    );

    // Inimigo
    infos_jogo.inimigo_balas = infos_jogo.inimigo_balas.filter(bala => {
        bala.mov_bala();

        
        if (!infos_jogo.game_over && verificarColisao(bala, {
            x: infos_jogo.player.x,
            y: infos_jogo.player.y,
            largura: 10,                                                   //Caso a bala do inimigo atinja o player, dá game over
            altura: 10
        })) {
            infos_jogo.game_over = true; 
        }

        return bala.y < canvas.height;
    });

    // Boss
    let BossAtual = boss
    if (BossAtual !== null) {
    infos_jogo.player.balas = infos_jogo.player.balas.filter(bala => {
        if (verificarColisao(bala, { x: BossAtual.x, y: BossAtual.y, largura: 100, altura: 100 })) {
            BossAtual.vida -= 10;
            if (BossAtual.vida <= 0) {
                infos_jogo.pontuacao += 10000
                boss = null;
            }
            return false;
        }
        return true;
    });
}
}


function verificarColisao(bala, objeto) {
    if (!objeto) return false;

    return (
        bala.x > objeto.x &&
        bala.x < objeto.x + (objeto.largura || 20) &&           //Verifica a colisão entre balas e objetos
        bala.y > objeto.y &&
        bala.y < objeto.y + (objeto.altura || 20)               // O || é para os inimigos que não passam sua altura nem largura e possuem os mesmos
    );                                                          // sendo valores fixos
}

function faseTexto(fase){
    ctx1.beginPath();
    ctx1.fillStyle = 'red';
    ctx1.font = "15px 'Press Start 2P'";
    ctx1.textAlign = "left";
    ctx1.fillText("Fase " +fase,5,25);
}
function pontuacao(pontos){
    ctx1.beginPath();
    ctx1.fillStyle = 'red';
    ctx1.font = "15px 'Press Start 2P'";
    ctx1.textAlign = "right";
    ctx1.fillText("PONTOS: " +String(pontos).padStart(7, '0'),canvas.width-5,25);
}

function atualizarInimigos() {
        infos_jogo.inimigos = infos_jogo.inimigos.filter(inimigo => {
            inimigo.mover();
            return inimigo.y < canvas.height;
        });
    }

function desenhar() {
    ctx1.clearRect(0,0,450,700)
    if (faseAtual === 3) {
        ctx1.drawImage(lua, 0, luaY, canvas.height, canvas.height);
    }

    
    desenharPlayer()
    infos_jogo.player.balas.forEach(bala => bala.desenhar());
    infos_jogo.inimigo_balas.forEach(bala => bala.desenhar());
    infos_jogo.inimigos.forEach(inimigo => inimigo.desenhar());
    if(boss){
        boss.desenhar();
    }
    
    faseTexto(faseAtual)
    pontuacao(infos_jogo.pontuacao)
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
            {x: 55, intervaloBala: 75},
            {x: 105, intervaloBala: 75},
            {x: 155, intervaloBala: 75},
            {x: 205, intervaloBala: 75},
            {x: 255, intervaloBala: 75},
            {x: 305, intervaloBala: 75},
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
            {x: 5, intervaloBala: 65},
            {x: 55, intervaloBala: 65},
            {x: 105, intervaloBala: 65},
            {x: 155, intervaloBala: 65},
            {x: 205, intervaloBala: 65},
            {x: 255, intervaloBala: 65},
            {x: 305, intervaloBala: 65},
            {x: 355, intervaloBala: 65},
            {x: 405, intervaloBala: 65},
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
    {
        fase:3,
        timeout:58000,
    }
    
    

] 

function rodarFase(){
    fases.forEach(fase =>{
        setTimeout(() =>{
            faseAtual = fase.fase

            if(fase.fase == 3){
                boss = new Boss(canvas.width/2, 0);
            }
            else {
                fase.inimigos.forEach(atributo =>{
                let inimigo = new Inimigo(atributo.x,0);
                inimigo.intervaloBala = atributo.intervaloBala;
                infos_jogo.inimigos.push(inimigo);
            });}
            
        }, fase.timeout);
    });
}

function loopJogo() {
    movePlayer();
    atualizarBalas();
    atualizarInimigos();
    
    
    desenhar();
    if (boss){
        boss.mover()
    }else if(faseAtual == 3 && !boss &&!infos_jogo.game_over){
        ctx1.beginPath();
                    ctx1.fillStyle = 'red';
                    ctx1.strokeStyle = 'white';
                    ctx1.font = "25px 'Press Start 2P'";
                    ctx1.textAlign = "center";
                    ctx1.strokeText("PARABÉNS",(canvas.width/2)+2,canvas.height/2);
                    ctx1.fillText("PARABÉNS",canvas.width/2,canvas.height/2);
                    ctx1.beginPath();
                    ctx1.fillStyle = 'red';
                    ctx1.font = "12px 'Press Start 2P'";
                    ctx1.textAlign = "center";
                    ctx1.fillText("Você conseguiu "+infos_jogo.pontuacao +" pontos",canvas.width/2,(canvas.height/2)+25);
    }
    if (fases.fase === 3) {
    ctx1.drawImage(lua, canvas.width/2, luaY, canvas.width, canvas.height);
}
    if (infos_jogo.teclas.includes('z')) {
        let agora = Date.now();
        if (agora - ultimaBala > intervaloBala) {
            adicionarBalas();
            ultimaBala = agora;
        }
    }
    if(infos_jogo.game_over){
        if(infos_jogo.game_over){
        ctx1.beginPath();
        ctx1.fillStyle = 'red';
        ctx1.strokeStyle = 'white';
        ctx1.font = "25px 'Press Start 2P'";
        ctx1.textAlign = "center";
        ctx1.strokeText("GAME OVER",(canvas.width/2)+2,canvas.height/2);
        ctx1.fillText("GAME OVER",canvas.width/2,canvas.height/2);
        ctx1.beginPath();
        ctx1.fillStyle = 'red';
        ctx1.font = "12px 'Press Start 2P'";
        ctx1.textAlign = "center";
        ctx1.fillText("Recarregue a página para recomeçar",canvas.width/2,(canvas.height/2)+25);
        }
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
// boss = new Boss(canvas.width / 2, 0);





// Código feito e modificado com base em: https://codigofacil.com.br/criar-jogo-em-javascript/