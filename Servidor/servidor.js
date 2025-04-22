require("colors")
var http = require('http');
var express = require('express')
let bodyParser = require("body-parser")


var app = express();
app.use(express.static('./public'))
app.use(bodyParser.urlencoded({extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.set('views', './views');

var server = http.createServer(app);

server.listen(80);

console.log("Servidor Rodando...".rainbow)


// Métodos e actions

app.get("/", function(requisicao, resposta){
    resposta.redirect("Laboratórios/Lab01/index.html")
})


app.post("/inicio", function(requisicao, resposta){
    resposta.redirect("Laboratórios/Lab01/index.html")
})

app.post("/cadastrar", function(requisicao, resposta){
    let nome = requisicao.body.nome;
    let login = requisicao.body.login;
    let senha = requisicao.body.senha;
    let nasc = requisicao.body.nascimento;
    
    console.log(nome, login, senha, nasc)
    resposta.render("resposta",{nome,login,senha,nasc});
})

// app.get("/cadastrar", function(requisicao, resposta){
//     let nome = requisicao.query.nome;
//     let login = requisicao.query.login;
//     let senha = requisicao.query.senha;
//     let nasc = requisicao.query.nascimento;
    
//     console.log(nome,login,senha,nasc)
// })


  app.get("/for_ejs", function(requisicao,resposta){
    let valor = requisicao.query.valor
    resposta.render("exemplo_for",{valor});
  })


// ------------------------------------------------------------------------------------

app.get("/cadastra", function(requisicao, resposta){
    resposta.redirect("Laboratórios/Lab08/cadastro.html")
})

app.get("/login", function(requisicao, resposta){
    resposta.redirect("Laboratórios/Lab08/login.html")
})

var contas = []

app.post("/cadastrolab", function(requisicao,resposta){
    var conta = []
    let login = requisicao.body.login
    conta.push(login)
    let senha = requisicao.body.senha
    conta.push(senha)
    
    console.log(conta)

    contas.push(conta)

    console.log(contas)

})

app.post("/loginlab", function(requisicao,resposta){
    let login = requisicao.body.login2

    let senha = requisicao.body.senha2

    resposta.render("resposta",{login,senha,contas})
})