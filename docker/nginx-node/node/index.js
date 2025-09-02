import { faker } from '@faker-js/faker';
import express from 'express';
import mysql from 'mysql';
const app = express()
const port = 3000
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
            name VARCHAR(255) NOT NULL
        )`, (err) => {
            if (err) {
                console.log(`Erro ao inserir, tentando novamente em 2s... (${retries} tentativas restantes)`)
                if (retries > 0) setTimeout(() => insertInitialData(retries - 1), 2000)
                else console.error('Não foi possível inserir o registro:', err)
                return
            }

            const randomName = faker.person.fullName(); 
            pool.query(`INSERT INTO people(name) VALUES(?)`, [randomName], (err) => {
                if (err) console.error(err);
                else console.log(`Registro inserido com sucesso: ${randomName}`);
            });
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

app.listen(port, "0.0.0.0", ()=> {
    console.log('Rodando na porta ' + port)
})