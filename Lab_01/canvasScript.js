
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

function desenhar_linha(start1, start2, end1, end2, color, tamanho, ctx){
    ctx.beginPath();
    ctx.lineWidth = tamanho
    ctx.strokeStyle = color;
    ctx.moveTo(start1,start2);
    ctx.lineTo(end1,end2)
    ctx.stroke();
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

