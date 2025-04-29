require("colors")
var http = require('http');
var express = require('express')
let bodyParser = require("body-parser")
var mongodb = require("mongodb")

const MongoClient = mongodb.MongoClient;
const uri = `mongodb+srv://GabrielB:gabM4242@fullstackbd.qgom4c8.mongodb.net/?retryWrites=true&w=majority&appName=FullStackBD`
const client = new MongoClient(uri, { useNewUrlParser: true });


var dbo = client.db("FullStackBD");
var usuarios = dbo.collection("usuarios");
var blog = dbo.collection("posts")



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

app.get("/inicio", function(requisicao, resposta){
    resposta.redirect("Laboratórios/Lab01/index.html")
})
app.post("/inicio", function(requisicao, resposta){
    resposta.redirect("Laboratórios/Lab01/index.html")
})

app.get("/Aula09", function(requisicao, resposta){
    resposta.redirect("Aula09.html")
})


app.post("/cadastrar", function(requisicao, resposta){
    let nome = requisicao.body.nome;
    let login = requisicao.body.login;
    let senha = requisicao.body.senha;
    let nasc = requisicao.body.nascimento;
    
    console.log(nome, login, senha, nasc)
    var data = { db_nome: nome, db_login: login, db_senha: senha, db_nasc: nasc };
    
    usuarios.insertOne(data, function(err){
        if(err){
            resposta.render("resposta2",{status: "Erro", nome,login,senha,nasc})
        }else{
            resposta.render("resposta2",{status: "Sucesso",nome,login,senha,nasc})
        }
    })
})

app.post("/logar_usuario", function(requisicao, resposta) {
    let login = requisicao.body.login;
    let senha = requisicao.body.senha;

    var data = {db_login: login, db_senha: senha}

    usuarios.find(data).toArray(function(err, items){
        console.log(items)
        if(items.length == 0){
            resposta.render("loginresposta",{status: "Usuário/Senha não encontrado(s)"})
        }else if(err){
            resposta.render("loginresposta",{status: "Erro ao logar"})
        }else{
            resposta.render("loginresposta",{status: "Usuário "+login+" Logado"})
        }
    })

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

var contas = [['plk3','123']]

app.post("/cadastrolab", function(requisicao,resposta){
    var conta = []
    let login = requisicao.body.login
    conta.push(login)
    let senha = requisicao.body.senha
    conta.push(senha)
    contas.push(conta)


})

app.post("/loginlab", function(requisicao,resposta){
    let login = requisicao.body.login2

    let senha = requisicao.body.senha2

    resposta.render("resposta",{login,senha,contas})
})

//------------------------------------------------------------------

app.get("/blog", function(requisicao,resposta){
    resposta.render("blog")
})


app.get("/postcriar", function(requisicao,resposta){
    resposta.redirect("Laboratórios/Lab09/cadastrar_post.html")
})


app.post("/criacao", function(requisicao,resposta){
    let titulo = requisicao.body.titulo
    let resumo = requisicao.body.resumo
    let conteudo = requisicao.body.conteudo
    console.log(titulo,resumo,conteudo)

    var data = {db_titulo: titulo, db_resumo: resumo, db_conteudo: conteudo}
    blog.insertOne(data, function(err){
        if(err){
            resposta.render("blogresposta", :)
        }else{
            resposta.render("resposta2")
        }
    })
})
