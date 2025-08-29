const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql')
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
})

function insertInitialData(retries = 20) {
    pool.query(`
        CREATE TABLE IF NOT EXISTS people (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            UNIQUE KEY unique_name (name)
        )`, (err) => {
            if (err) {
                console.log(`Erro ao inserir, tentando novamente em 2s... (${retries} tentativas restantes)`)
                if (retries > 0) setTimeout(() => insertInitialData(retries - 1), 2000)
                else console.error('Não foi possível inserir o registro:', err)
                return
            }

            pool.query(`INSERT INTO people(name) VALUES('Fulano de Tal')`, (err) => {
                if (err) console.error(err)
                else console.log('Registro inserido com sucesso!')
            })
        })
}
insertInitialData()

app.get('/', (req,res) => {
    pool.query("SELECT name FROM people", (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao consultar o banco de dados');
        }

        let html = '<h1>Full Cycle</h1>'
        html += '<ul>';
        results.forEach(row => {
            html += `<li>${row.name}</li>`;
        });
        html += '</ul>';
        res.send(html);
    });
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})