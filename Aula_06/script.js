let p1 = document.getElementById('p1').innerHTML;
console.log(p1);
document.getElementById('p1').innerHTML = "Olá Mundo!"

// Exemplo 01
// let nome = prompt("Qual o seu nome?");
// let idade = parseInt(prompt("Qual a sua idade?"));
// let anoAtual = 2025;
// let anoNasc = anoAtual - idade;
// let resposta = 
// "Olá " + nome + ", seu ano de nascimento é: " + anoNasc + "!"
// document.getElementById('ex1').innerHTML = resposta

// Exemplo de função
function imprimeMensagem(msg){
    console.log(msg);
}

imprimeMensagem('Mensagem 1');

imprimeMensagem('Mensagem 2');

imprimeMensagem('Mensagem 3');

// Exemplo de função soma
function soma(a,b){
    return a + b;
}

function mult(a,b){
    return a*b
}
let c = soma(3,4);
console.log("A soma de " + 3 + " e " + 4 + " é igual a " + c);

// Exemplo 02
function incremento(){
    let num = parseInt(document.getElementById('ex2_in').value);
    console.log("Incrementos até " + num)
    for (let i = 0; i <= num; i++){
        console.log(i)};

};

//Exemplo 03
function somar(){
    let num1 = parseInt(document.getElementById('ex3_in1').value);
    let num2 = parseInt(document.getElementById('ex3_in2').value);
    let result = soma(num1,num2);
    document.getElementById('soma').innerHTML = ("A soma de " + num1 + " e " + num2 + " é " + result );
}

//Exemplo 04
function ex4(){
    let num1 = parseInt(document.getElementById('ex4_in1').value);
    let num2 = parseInt(document.getElementById('ex4_in2').value);
    let result = 0;
    if (num1 < 0 || num2 < 0){
        result = soma(num1,num2);
    }else{
    result = mult(num1,num2);}
    document.getElementById('resposta4').innerHTML = "O resultado é: " + result
}