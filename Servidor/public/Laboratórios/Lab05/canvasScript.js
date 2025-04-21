
function desenhar_quadrado(pos1, pos2, dim1, dim2, colorfill, colorstroke, linha, ctx){
    ctx.beginPath();
    ctx.lineWidth = linha;
    ctx.fillStyle = colorfill;
    ctx.strokeStyle = colorstroke;
    ctx.fillRect(pos1,pos2, dim1, dim2);
    ctx.strokeRect(pos1, pos2, dim1, dim2);
    ctx.closePath();
    console.log("Quadrado")
}

function desenhar_linha(start1, start2, end1, end2, color, tamanho, ctx, meio1, meio2, fill){
    ctx.beginPath();
    ctx.lineWidth = tamanho
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.moveTo(start1,start2);
    ctx.lineTo(meio1,meio2);
    ctx.lineTo(end1,end2);
    ctx.stroke();
    if (fill = 1){
        ctx.fill()
    }
    ctx.closePath();
    console.log("Linha")
}

function desenhar_arco(pos1, pos2, raio, inicio, fim, colorfill, colorstroke, linha, ctx){
    ctx.beginPath();
    ctx.lineWidth = linha;
    ctx.strokeStyle = colorstroke;
    ctx.fillStyle = colorfill;
    ctx.arc(pos1,pos2,raio,inicio*Math.PI,fim*Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    console.log("Arco")
}

function escrever(pos1, pos2, texto, fonte, alinhamento, colorfill, colorstroke, linha, ctx){
    ctx.beginPath();
    ctx.lineWidth = linha;
    ctx.fillStyle = colorfill;
    ctx.strokeStyle = colorstroke;
    ctx.font = fonte
    ctx.textAlign = alinhamento;
    ctx.fillText(texto,pos1,pos2);
    ctx.strokeText(texto,pos1,pos2);
    ctx.closePath();
    console.log("Texto")

}

let cvs = document.getElementById('cvs1')
let ctx = cvs.getContext('2d')

desenhar_quadrado(250, 0, 50, 50, 'red', 'transparent', 1, ctx)
desenhar_quadrado(0, 0, 50, 50, 'blue', 'transparent', 1, ctx)
desenhar_linha(0, 0, 150, 150, 'blue', 1, ctx)
desenhar_linha(300, 0, 150, 150, 'red', 1, ctx)
desenhar_quadrado(0, 125, 25, 50, 'aqua', 'transparent', 1, ctx)
desenhar_quadrado(275, 137, 25, 25, 'aqua', 'transparent', 1, ctx)
desenhar_quadrado(100, 150, 50, 50, 'red', 'transparent', 1, ctx)
desenhar_linha(150,150, 150, 300, 'black', 1, ctx)
desenhar_quadrado(0, 250, 25, 50, 'yellow', 'transparent', 1, ctx)
desenhar_quadrado(0, 275, 50, 25, 'yellow', 'transparent', 1, ctx)
desenhar_quadrado(275, 250, 25, 50, 'black', 'transparent', 1, ctx)
desenhar_quadrado(250, 275, 50, 25, 'black', 'transparent', 1, ctx)
desenhar_linha(0, 150, 300, 150, 'green', 1, ctx)
desenhar_arco(150, 150, 50, 1, 2, 'transparent', 'green', 1, ctx)
desenhar_arco(150, 150, 75, 1, 1.25, 'transparent', 'green', 1, ctx)
desenhar_arco(150, 150, 75, 1.75, 2, 'transparent', 'green', 1, ctx)
desenhar_arco(150, 300, 50, 1, 2, 'aqua', 'green', 1, ctx)
desenhar_arco(150, 300, 90, 1, 1.5, 'transparent', 'green', 1, ctx)
desenhar_arco(150, 300, 75, 1.5, 2, 'transparent', 'green', 1, ctx)
desenhar_arco(62,212,12,0,2,'yellow','green',1,ctx)
desenhar_arco(238,212,12,0,2,'yellow','green',1,ctx)
desenhar_arco(150,120,12,0,2,'aqua','blue',1,ctx)
escrever(150, 50, 'Canvas', '20px Arial', 'center', 'black', 'transparent', 2, ctx)
desenhar_linha(0, 0, 0, 300, 'black', 2, ctx)
desenhar_linha(0, 0, 300, 0, 'black', 2, ctx)
desenhar_linha(300, 300, 0, 300, 'black', 2, ctx)
desenhar_linha(300, 300, 300, 0, 'black', 2, ctx)

let cvs2 = document.getElementById('cvs2')
let ctx2 = cvs2.getContext('2d')

desenhar_quadrado(10,10,280,280, 'aquamarine', 'transparent', 1, ctx2)
desenhar_quadrado(10,200,280,90, 'grey', 'transparent', 1, ctx2)
desenhar_linha(112.5, 125, 187.5, 125, 'indianred', 1, ctx2, 150, 95, 1)
desenhar_quadrado(112.5,125,75,75, 'saddlebrown', 'transparent', 1, ctx2)
desenhar_quadrado(10,250,100,40, 'dodgerblue', 'transparent', 1, ctx2)
desenhar_arco(110,290,40,1,2,'dodgerblue', 'transparent', 1, ctx2)
desenhar_quadrado(10,200,40,90, 'dodgerblue', 'transparent', 1, ctx2)
desenhar_arco(10,200,40,1.5,2.5,'dodgerblue', 'transparent', 1, ctx2)
desenhar_quadrado(50,170,15,30, 'sienna', 'transparent', 1, ctx2)
desenhar_arco(57.5,155,20,0,2,'green','transparent',1,ctx2)
desenhar_quadrado(250,210,15,30, 'sienna', 'transparent', 1, ctx2)
desenhar_arco(257.5,195,20,0,2,'green','transparent',1,ctx2)
desenhar_quadrado(142.5,165,15,35, 'brown', 'transparent', 1, ctx2)
desenhar_quadrado(119.5,142.5,22.5,22.5, 'deepskyblue', 'transparent', 1, ctx2)
desenhar_quadrado(157,142.5,22.5,22.5, 'deepskyblue', 'transparent', 1, ctx2)
desenhar_arco(225,75,40,0,2,'yellow','transparent',1,ctx2)
