const express = require("express")
const server = express()


const ideas = [
    {
        img: "https://www.flaticon.com/premium-icon/icons/svg/3242/3242257.svg",
        title: "Curso de programação",
        category: "Estudo",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate exercitationem omnis expedita, nihil quam itaque delectus sed alias reiciendis harum nobis ut explicabo minus perferendis recusandae, iusto, totam cumque similique!",
        url: "https://www.google.com"
    },
    {
        img: "https://www.flaticon.com/premium-icon/icons/svg/3242/3242372.svg",
        title: "Exercícios",
        category: "Saúde",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate exercitationem omnis expedita, nihil quam itaque delectus sed alias reiciendis harum nobis ut explicabo minus perferendis recusandae, iusto, totam cumque similique!",
        url: "https://www.google.com"
    },
    {
        img: "https://www.flaticon.com/premium-icon/icons/svg/3242/3242296.svg",
        title: "Meditação",
        category: "Mentalidade",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate exercitationem omnis expedita, nihil quam itaque delectus sed alias reiciendis harum nobis ut explicabo minus perferendis recusandae, iusto, totam cumque similique!",
        url: "https://www.google.com"
    },
    {
        img: "https://www.flaticon.com/br/premium-icon/icons/svg/3242/3242292.svg",
        title: "Karaokê",
        category: "Lazer",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate exercitationem omnis expedita, nihil quam itaque delectus sed alias reiciendis harum nobis ut explicabo minus perferendis recusandae, iusto, totam cumque similique!",
        url: "https://www.google.com"
    }
]




// Configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))


// Configuração do nunjucks (Com ele podemos ter variáveis no HTML)
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server, // O express vai ser nosso server
    noCache: true, // Desabilitamos o cache do nunjucks para ele não guardar os estilos em cache
})
// cache -> são coisas que o servidor acha que são importantes para guardar para mais tarde



// Criei uma rota /
// e capturo o pedido do cliente para responder
server.get("/", function(req, res) { // Com o get conseguimos uma resposta do back end
    
    const reversedIdeas = [...ideas].reverse()

    let lastIdeas = []
    for (let idea of reversedIdeas) {
        if (lastIdeas.length < 2) {
            lastIdeas.push(idea)
        }
    }

    return res.render(__dirname + "/views/index.html", { ideas: lastIdeas }) // sendFile -> Responsável por enviar arquivos
    // Com o nunjucks no nosso projeto iremos precisar do render
    // Obs: O sendFile pede o caminho absoluto do diretório
})

server.get("/ideas", function(req, res) { // Com o get conseguimos uma resposta do back end

    const reversedIdeas = [...ideas].reverse()

    return res.render(__dirname + "/views/ideias.html", { ideas: reversedIdeas }) // sendFile -> Responsável por enviar arquivos
    // Obs: O sendFile pede o caminho absoluto do diretório
})

server.listen(3000) // Usamos o listen para abrir uma porta
