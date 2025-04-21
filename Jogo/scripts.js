// Reconhecimento das teclas

let teclas = []
let balas = []
let bulletCounter = 0
let balaIntervalo = null;

document.addEventListener('keydown', function(evento){
    let tecla = evento.key;
    if (teclas.includes(tecla) == false){teclas.push(tecla)} 
    if (balaIntervalo == null && tecla == 'z'){
        addbala();
        balaIntervalo = setInterval(addbala, 200)
    }
})
document.addEventListener('keyup', function(evento2){
    let tecla = evento2.key;
    let index = teclas.indexOf(tecla)
    if (index > -1) {
        teclas.splice(index, 1); 
      }

      
    if (tecla === 'z') {
        clearInterval(balaIntervalo);
        balaIntervalo = null;
    }
})
//


function desenhar_arco(pos1, pos2, raio, inicio, fim, colorfill, colorstroke, linha, ctx){
    ctx.beginPath();
    ctx.lineWidth = linha;
    ctx.strokeStyle = colorstroke;
    ctx.fillStyle = colorfill;
    ctx.arc(pos1,pos2,raio,inicio*Math.PI,fim*Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();}

// class bala{
//     constructor(x, y, cor_linha, cor_preenchimento, raio, inicio, fim, espessura_linha){
//         this.cor_linha = cor_linha ;
//         this.cor_preenchimento = cor_preenchimento ;
//         this.espessura_linha = espessura_linha ;
//         this.x = x ;
//         this.y = y ;
//         this.raio = raio ;
//         this.inicio = inicio ;
//         this.fim = fim
        
//     }
//     desenhar_arco(contexto){
//         contexto.beginPath();
//         contexto.lineWidth = this.espessura_linha;
//         contexto.strokeStyle = this.cor_linha;
//         contexto.fillStyle = this.cor_preenchimento;
//         contexto.arc(this.x,this.y,this.raio,this.inicio*Math.PI,this.fim*Math.PI);
//         contexto.fill();
//         contexto.stroke();
//         contexto.closePath();
//     }

// }



class retangulo{
    constructor(cor_linha, cor_preenchimento, espessura_linha, x, y, largura, altura){
        this.cor_linha = cor_linha ;
        this.cor_preenchimento = cor_preenchimento ;
        this.espessura_linha = espessura_linha ;
        this.x = x ;
        this.y = y ;
        this.largura = largura ;
        this.altura = altura ;
        
    }
    desenhar_retangulo(contexto){
        contexto.beginPath();
        contexto.lineWidth = this.espessura_linha;
        contexto.fillStyle = this.cor_preenchimento;
        contexto.strokeStyle = this.cor_linha;
        contexto.fillRect(this.x,this.y,this.largura,this.altura);
        contexto.strokeRect(this.x,this.y,this.largura,this.altura);
        contexto.closePath();

    }   
}

let canvas1 = document.getElementById('canvas1');
let ctx1 = canvas1.getContext('2d')
let nave = new retangulo('blue', '#dc6ae2', 2, 215, 670, 10, 10)
function movimentacao(){
    ctx1.clearRect(0,0,450,700)
    nave.desenhar_retangulo(ctx1)
    if (teclas.includes('ArrowUp')){
        nave.y += -2
    }
    if (teclas.includes('ArrowDown')){
        nave.y += 2
    }
    if (teclas.includes('ArrowRight')){
        nave.x += 2
    }
    if (teclas.includes('ArrowLeft')){
        nave.x += -2
    }

    if(nave.x < 0){nave.x = 0}
    if(nave.x > 440){nave.x = 440}
    if(nave.y < 0){nave.y = 0}
    if(nave.y > 690){nave.y = 690}

    desenharBalas()
    balamover()
    requestAnimationFrame(movimentacao)
}

movimentacao()


//funções balas

function addbala(){
    let newBala = {
        x: nave.x+5,
        y: nave.y
    }
    balas.push(newBala)
    console.log("bala")
}

function balamover(){balas.forEach(bala => {
    balas = balas.filter(bala => bala.y > 0)
    bala.y +=-2
    
}
)}

function desenharBalas(){
    balas.forEach(bala => {
        desenhar_arco(bala.x, bala.y, 3, 0, 2, '#ffdb29', 'transparent', 1, ctx1);
    })}


//








