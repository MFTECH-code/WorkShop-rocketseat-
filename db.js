const sqlite3 = require("sqlite3").verbose() // Verbose são mensagens que ele enviara no nosso terminal
const db = new sqlite3.Database('./ws.db') // Criando o nosso banco de dados

db.serialize(function() {
    // O serialize permite que possamos rodar vários comandos SQL um atras do outro

    // Criar a tabela
    db.run(`
    CREATE TABLE IF NOT EXISTS ideas(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT,
        title TEXT,
        category TEXT,
        description TEXT,
        link TEXT
    );
    `)
    // Inserir dado na tabela
    
    const query = `INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?, ?, ?, ?, ?);
    `
    const values = [
        "https://www.flaticon.com/premium-icon/icons/svg/3242/3242257.svg",
        "Curso de programação",
        "Estudo",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate exercitationem omnis expedita, nihil quam itaque delectus sed alias reiciendis harum nobis ut explicabo minus perferendis recusandae, iusto, totam cumque similique!",
        "https://www.google.com"
    ]

    db.run(query, values, function(err) {
        if (err) return console.log(err)

        console.log(this)
    })
    
    // Deletar um dado da tabela
    /*
    db.run(`DELETE FROM ideas WHERE id = ?`, [1], function(err) {
        if (err) return console.log(err)

        console.log("DELETEI", this)
    })
    */
    // Consultar dados na tabela
    /*
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) return console.log(err)

        console.log(rows)
    })  
    */

})

module.exports = db // Exportando nosso banco de dados