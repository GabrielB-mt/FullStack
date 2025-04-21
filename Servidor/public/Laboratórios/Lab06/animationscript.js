let canvas = document.getElementById('cvs1')
let ctx = canvas.getContext('2d')


let jellyfish = {
    x: 125,
    y: 125,
    raio: 25,
    img: new Image(),
    desenha: function(){
        this.img.src = "../../imagens/tomarijellyfish.png";
        ctx.beginPath();
        ctx.drawImage(this.img, this.x, this.y, 2*this.raio, 2*this.raio);
        ctx.closePath();
    }
}

function animacao(){
    ctx.clearRect(0,0,400,400)
    jellyfish.desenha();
    requestAnimationFrame(animacao)
}
animacao();

document.addEventListener('mousemove',function(evento){
    let rect = canvas.getBoundingClientRect();
    let x_mouse = evento.clientX - rect.left;
    let y_mouse = evento.clientY - rect.top;
    console.log(x_mouse,y_mouse);
    if (x_mouse < 25){
        x_mouse = 25
    }
    if (x_mouse > 275){
        x_mouse = 275
    } 
    if (y_mouse < 25){
        y_mouse = 25
    }
    if (y_mouse > 275){
        y_mouse = 275
    }
    jellyfish.x = x_mouse-25;
    jellyfish.y = y_mouse-25;
    
})
