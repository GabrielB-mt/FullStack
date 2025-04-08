// let carro = {
//     cor: 'green',
//     modelo: 'SUV',
//     marca: 'Toyota',
//     buzina: function(){
//         return('bii bii');
//     }
// };

// let carro2 = {
//     cor: 'green',
//     modelo: 'SUV',
//     marca: 'Ford',
//     buzina: function(){
//         return('fon fon');
//     }
// };

class Carro {
    constructor(cor, modelo, marca){
        this.cor = cor;
        this.modelo = modelo;
        this.marca = marca;
    }
    buzina(){
        return 'bii bii'
    }
}

let carro1 = new Carro('green', 'SUV', 'Toyota');
let carro2 = new Carro('black', 'SUV', 'Ford');

console.log(carro1);
console.log(carro2);
// console.log(carro);
// console.log(carro.cor);
// console.log(carro.buzina());
// console.log(carro2.buzina());



// let carros = []
// carros.push(carro)
// carros.push(carro2)
// for(let i = 0; i < carros.length; i++){
//     console.log(carros[i].buzina())
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

let retangulo_1 = new retangulo('black','red', 2, 0, 2, 30, 30)
let retangulo_2 = new retangulo('blue', '#dc6ae2', 2, 200, 200, 30, 30)
let retangulo_3 = new retangulo('blue', 'green', 2, 200, 200, 30, 30)


function animacao(){
    retangulo_1.x += 1;
    if (retangulo_1.x == 400){
        retangulo_1.x = -29
    }
    ctx1.clearRect(0,0,400,400)
    retangulo_1.desenhar_retangulo(ctx1)
    retangulo_2.desenhar_retangulo(ctx1)
    retangulo_3.desenhar_retangulo(ctx1)


    requestAnimationFrame(animacao)
}

animacao()



document.addEventListener('keydown', function(evento){
    let tecla = evento.key;
    console.log(tecla)

    let velocidade = 5
    if(tecla == 'ArrowUp'){
        retangulo_2.y += -velocidade
    }
    if(tecla == 'ArrowDown'){
        retangulo_2.y += velocidade
    }
    if(tecla == 'ArrowRight'){
        retangulo_2.x += velocidade
    }
    if(tecla == 'ArrowLeft'){
        retangulo_2.x += -velocidade
    }
})


document.addEventListener('mousemove', function(evento){
    let rect = canvas1.getBoundingClientRect()
    let x_mouse = evento.clientX - rect.left
    let y_mouse = evento.clientY - rect.top
    console.log(x_mouse, y_mouse)
    retangulo_3.x = x_mouse
    retangulo_3.y = y_mouse
})