const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db.js")

// configurar pasta publica
server.use(express.static("public"))

// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
})
// configurar caminhos da minha aplicação
// página inicial
// req: Requisição
// res: Resposta

// página inicial
server.get("/", (req, res) => {
  return res.render("index.html", { title: "Um título" })
})

// criar outras rotas:
server.get("/create-point", (req, res) => {
  return res.render("create-point.html")
})

server.get("/search", (req, res) => {
  db.all(`SELECT * FROM places`, function (err, rows) {
    if (err) {
      return console.log(err)
    }
    // mostrar a página html com os dados do banco de dados
    return res.render("search-results.html", { places: rows })
  })
})

// ligar o servidor
server.listen(3000)
