require("colors")
var http = require('http');
var express = require('express')
let bodyParser = require("body-parser")
var mongodb = require("mongodb")



const MongoClient = mongodb.MongoClient;
const uri = 'mongodb+srv://GabrielB:F9WpFg6YMTZUWbzE@fullstackbd.qgom4c8.mongodb.net/?retryWrites=true&w=majority&appName=FullStackBD'
const client = new MongoClient(uri, { useNewUrlParser: true });


var dbo = client.db("FullStackBD");
var usuarios = dbo.collection("usuarios");
var blog = dbo.collection("posts");
var carros_usuarios = dbo.collection("carros_usuarios")
var carros_cadastrados = dbo.collection("carros_cadastrados")


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

app.post("/atualizar_senha", function(requisicao, resposta){
    let login = requisicao.body.login
    let senha = requisicao.body.senha
    let novasenha = requisicao.body.novasenha

    let data = {db_login: login, db_senha: senha}
    let newdata = { $set: {db_senha: novasenha}}

    usuarios.updateOne(data, newdata, function(err, result){
        console.log(result);
        if (result.modifiedCount == 0) {
            resposta.render('loginresposta', {status: "Usuário/senha não encontrado!"})
          }else if (err) {
            resposta.render('loginresposta', {status: "Erro ao atualizar usuário!"})
          }else {
            resposta.render('loginresposta', {status: "Usuário atualizado com sucesso!"})        
          };
    
    })

})


app.post("/remover_usuario", function(requisicao, resposta){
    let login = requisicao.body.login
    let senha = requisicao.body.senha

    let data = {db_login: login, db_senha: senha}

    usuarios.deleteOne(data, function(err, result){
        console.log(result);
        if (result.deletedCount == 0) {
            resposta.render('loginresposta', {status: "Usuário/senha não encontrado!"})
          }else if (err) {
            resposta.render('loginresposta', {status: "Erro ao remover usuário!"})
          }else {
            resposta.render('loginresposta', {status: "Usuário removido com sucesso!"})        
          };
    
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
// Lab08

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
// Lab 09

app.get("/blog", function(requisicao,resposta){
    blog.find().toArray(function(err, items){
        if(err){resposta.render("blog", {status: "erro"})
        }else {resposta.render("blog",{data:items})}
    })
    
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
            resposta.render("blogresposta", {status:"Erro"})
        }else{
            resposta.render("blogresposta")
        }
    })
})


//------------------------------------------------------------------
// Lab10


app.get("/carro_cadastra", function(requisicao,resposta){
    resposta.redirect("/Laboratórios/Lab10/cadastra.html")
})

app.post("/carro_cadastrar_usuario", function(requisicao,resposta){
    let nome = requisicao.body.nome
    let login = requisicao.body.login
    let senha = requisicao.body.senha

    let data = {db_nome: nome, db_login: login, db_senha: senha}
    
    carros_usuarios.insertOne(data, function(err){
        if(err){
            resposta.render("carros_conta_resposta", {status: "Erro ao cadastrar"})
        }else{resposta.render("carros_conta_resposta", {status: "Cadastro feito com sucesso!"})}
    })
})

app.get("/carro_loga", function(requisicao,resposta){
    resposta.redirect("/Laboratórios/Lab10/loga.html")
})

app.post("/carros_logar_usuario", function(requisicao,resposta){
    let login = requisicao.body.login
    let senha = requisicao.body.senha

    let data = {db_login: login, db_senha: senha}

    carros_usuarios.find(data).toArray(function(err, items){
        if(items.length == 0){
            resposta.render("carros_conta_resposta", {status: "Usuário/Senha não encontrado(s)", logado: false})
        }else if(err){
            resposta.render("carros_conta_resposta", {status: "Erro ao logar", logado: false})
        }else{
            resposta.render("carros_conta_resposta", {status: "Usuário logado! Bem vindo(a) "+ items[0]['db_nome'], logado: true})
        }
    })
})

app.post("/cadastrar_carro", function(requisicao, resposta){
    let marca = requisicao.body.marca
    let modelo = requisicao.body.modelo
    let ano = requisicao.body.ano
    
    let qtd_disponivel = requisicao.body.qtd


    let data = {db_marca: marca, db_modelo: modelo, db_ano: ano, db_qtd_disponivel: qtd_disponivel}
    
    carros_cadastrados.insertOne(data, function(err){
        if(err){
            resposta.render("cadastro_carro_resposta", {status: "Erro ao cadastrar"})
        }else{resposta.render("cadastro_carro_resposta", {status: "Carro cadastrado com sucesso!"})}
    })
})

app.post("/vender_carro", function(requisicao, resposta){
    let marca = requisicao.body.marca
    let modelo = requisicao.body.modelo
    let ano = requisicao.body.ano

    let data = {db_marca: marca, db_modelo: modelo, db_ano: ano}
    let newdata = { $set: {db_qtd_disponivel: += -1} }
    
    carros_cadastrados.updateOne(data, newdata, function(err, result){
        console.log(result)
        if (result.modifiedCount == 0){
            resposta.render("cadastro_carro_resposta", {status: "Carro não encontrado"})
        }else if (err){
            resposta.render("cadastro_carro_resposta", {status: "Erro ao vender carro"})
        }else{
            resposta.render("cadastro_carro_resposta", {status: "Carro vendido!"})
        }
    })
})