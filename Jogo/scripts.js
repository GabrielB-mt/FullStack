
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
let retangulo_2 = new retangulo('blue', '#dc6ae2', 2, 200, 200, 30, 30)
function animacao(){
    ctx1.clearRect(0,0,400,400)
    retangulo_2.desenhar_retangulo(ctx1)

    requestAnimationFrame(animacao)
}

animacao()


let teclas = []


document.addEventListener('keydown', function(evento){
    let tecla = evento.key;
    console.log(tecla)

    teclas.    ;
})