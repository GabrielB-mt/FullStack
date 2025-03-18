// window.alert("Hello World!")
console.log("Hello World!")

//let nome = prompt("Qual o seu nome?");
//console.log(nome)

// console.log("while")
// let i = 0;
// while(i < 10){
//     console.log(i);
//     // i++
//     // i = i + 1;
//     i += 1;
// }
// console.log("for")
// for(let i = 0; i < 10; i++){
//     console.log(i);
// }

console.log("Ex 1")
for(let i=1; i < 100; i++){
    if(i%2 !== 0){
        console.log(i)
    }
}

console.log("Ex 2")
for(let i=1; i < 501; i++){
    if(i%5 == 0){
        console.log(i)
    }
}

// console.log("Ex 3")
// let n = parseInt(prompt("Digite um número:"))
// if(n < 0){
//     console.log("Número Inválido")
// }
// while(n >= 0){
//     console.log(n)
//     n = n - 1
// }

console.log("Ex 4")
let num = parseInt(prompt("Digite um número:"))
let mult = 1
for(let i = num; i >= 1; i--){
    mult *= i;
    console.log(i, mult)
}


