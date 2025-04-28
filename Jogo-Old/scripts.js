// Reconhecimento das teclas

let teclas = []
let balas = []
let inimigos = []
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





class nave{
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
let naveplayer = new nave('blue', '#dc6ae2', 2, 215, 670, 10, 10)
// let naveinimigo = new nave('black', 'red', 2, 205, 200, 20, 20)
function movimentacao(){
    ctx1.clearRect(0,0,450,700)
    naveplayer.desenhar_retangulo(ctx1)
    // naveinimigo.desenhar_retangulo(ctx1)
    if (teclas.includes('ArrowUp')){
        naveplayer.y += -2
    }
    if (teclas.includes('ArrowDown')){
        naveplayer.y += 2
    }
    if (teclas.includes('ArrowRight')){
        naveplayer.x += 2
    }
    if (teclas.includes('ArrowLeft')){
        naveplayer.x += -2
    }

    if(naveplayer.x < 0){naveplayer.x = 0}
    if(naveplayer.x > 440){naveplayer.x = 440}
    if(naveplayer.y < 0){naveplayer.y = 0}
    if(naveplayer.y > 690){naveplayer.y = 690}

    desenharBalas()
    balamover()
    requestAnimationFrame(movimentacao)
}

movimentacao()


//funções balas

function addbala(){
    let newBala = {
        x: naveplayer.x+5,
        y: naveplayer.y
    }
    balas.push(newBala)
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



function addInimigo(pos1,pos2){
    let newInimigo = {
        x: pos1,
        y: pos2
    }
    inimigos.push(newInimigo)
}

//  function desenharInimigos(){
//      inimigos = inimigos.filter(inimigo => {let vivo = true
//          balas.forEach(bala => )
//      }
        
//     )
//     inimigos.forEach(inimigo => {
//         nave.desenhar_retangulo('black', 'red', 2, inimigo.x, inimigo.y, 20, 20)
//     })
// }

function colisao(bala, inimigo){
    return (bala.x > inimigo.x && bala.x < inimigo.x + 20 && 
    bala.y > inimigo.y && bala.y < inimigo.y+20);
}

