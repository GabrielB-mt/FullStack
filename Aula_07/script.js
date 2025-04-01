let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

//retangulos
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'blue';
ctx.strokeStyle = 'red';
ctx.fillRect(0,0,70,70);
ctx.strokeRect(70,70,50,50);
ctx.strokeRect(95,95,50,50);
ctx.closePath();

//linhas
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'blue';
ctx.strokeStyle = 'red';
ctx.moveTo(200,150);
ctx.lineTo(120,120);
ctx.lineTo(60,250);
ctx.lineTo(200,250);
ctx.lineTo(200,150);
ctx.fill();
ctx.stroke();
ctx.closePath(); 


//arco
ctx.beginPath();
ctx.lineWidth = 2;
ctx.strokeStyle = 'red';
ctx.fillStyle = 'blue';
ctx.arc(200,200,50,1.5*Math.PI,2.5*Math.PI);
ctx.fill();
ctx.stroke();
ctx.closePath();

//texto
ctx.beginPath();
ctx.lineWidth = 3;
ctx.fillStyle = 'blue';
ctx.strokeStyle = 'red';
ctx.font = "90px Arial"
ctx.textAlign = "center";
ctx.fillText("Olá",200,350);
ctx.strokeText("Olá",198,350);
ctx.closePath();

//ex1
let canvas1 = document.getElementById('canvas1')
let ctx1 = canvas1.getContext('2d')
ctx1.beginPath();
ctx1.fillStyle = 'red';
ctx1.fillRect(0,0,50,50);
ctx1.closePath();

ctx1.beginPath();
ctx1.fillStyle = 'blue';
ctx1.fillRect(350,0,50,50);
ctx1.closePath();

ctx1.beginPath();
ctx1.fillStyle = 'green';
ctx1.fillRect(350,350,50,50);
ctx1.closePath();

ctx1.beginPath();
ctx1.fillStyle = 'yellow';
ctx1.fillRect(0,350,50,50);
ctx1.closePath();

ctx1.beginPath();
ctx1.strokeStyle = 'red';
ctx1.moveTo(0,0);
ctx1.lineTo(400,400)
ctx1.stroke();
ctx1.closePath();

ctx1.beginPath();
ctx1.strokeStyle = 'green';
ctx1.moveTo(0,200);
ctx1.lineTo(400,200)
ctx1.stroke();
ctx1.closePath();

ctx1.beginPath();
ctx1.lineWidth = 1;
ctx1.strokeStyle = 'green';
ctx1.arc(200,200,50,0,1*Math.PI);
ctx1.stroke();
ctx1.closePath();

ctx1.beginPath();
ctx1.strokeStyle = 'blue';
ctx1.moveTo(400,0);
ctx1.lineTo(0,400)
ctx1.stroke();
ctx1.closePath();

ctx1.beginPath();
ctx1.lineWidth = 1;
ctx1.strokeStyle = 'green';
ctx1.fillStyle = 'yellow';
ctx1.arc(50,125,20,0,2*Math.PI);
ctx1.fill();
ctx1.stroke();
ctx1.closePath();

ctx1.beginPath();
ctx1.lineWidth = 1;
ctx1.strokeStyle = 'green';
ctx1.fillStyle = 'yellow';
ctx1.arc(350,125,20,0,2*Math.PI);
ctx1.fill();
ctx1.stroke();
ctx1.closePath();

ctx1.beginPath();
ctx1.lineWidth = 3;
ctx1.fillStyle = 'black';
ctx1.font = "20px Arial";
ctx1.textAlign = "center";
ctx1.fillText("Desenvolvimento Web", 200, 100);
ctx1.closePath();

//ex2
let canvas2 = document.getElementById('canvas2')
let ctx2 = canvas2.getContext('2d')

ctx2.beginPath();
ctx2.fillStyle = 'aquamarine';
ctx2.fillRect(10,10,380,380);
ctx2.closePath();

ctx2.beginPath();
ctx2.fillStyle = 'grey';
ctx2.fillRect(10,300,380,90);
ctx2.closePath();

ctx2.beginPath();
ctx2.fillStyle = 'saddlebrown';
ctx2.fillRect(150,200,100,100);
ctx2.closePath();

ctx2.beginPath();
ctx2.fillStyle ='indianred';
ctx2.moveTo(200,150);
ctx2.lineTo(250,200);
ctx2.lineTo(150,200);
ctx2.lineTo(200,150);
ctx2.fill();
ctx2.closePath();

ctx2.beginPath();
ctx2.fillStyle = 'deepskyblue';
ctx2.fillRect(160,220,30,30)
ctx2.closePath();
