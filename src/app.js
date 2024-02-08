const express = require('express')
const app =  express()
const port = 3000
const MySql = require('mysql2')
const bodyParser = require ('body-parser')

app.use(bodyParser.json())

const banco_de_dados = MySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'c@tolic@',
    database: 'turma'
})

app.post('/criar',(req, res) => {

})

banco_de_dados.connect((err) => {
    if (err){
        console.log ('erro na conexão com mysql',err)
    }else{
        console.log ('Conexão estabelecida com MySql')
    }
})

app.post('/alunos/criar', (req, res) => {
    const {aluno, idade} = req.body
    const values = [aluno, idade]

    banco_de_dados.query('INSERT INTO 3a (aluno, idade) VALUES(?,?)', values, (err, results) => {
        if (err) {
            res.status(400).send('erro ao inserir no mysql');
        } else {
            res.send('dados inseridos com sucesso');
        }
    })
})

app.get('/alunos', (req, res) => {
    banco_de_dados.query('SELECT * FROM 3a', (err, results) => {
        if (err){
            res.send('Erro ao consultar no mysql', err)
        } else {
            res.send(results)
        }
    })
})

app.get('/alunos/:id', (req, res) => {
    const id = req.params.id
    banco_de_dados.query('SELECT * FROM 3a WHERE ID=?',[id], (err, results) => {
        if (err) {
            res.send('Erro ao consultar')
        } else {
            res.send(results)
        }
    })
})

app.put('/alunos/alterar/:id',(req,res) => {
    const id = req.params.id
    const {aluno} = req.body
    const value = [aluno, id]
    banco_de_dados.query('UPDATE 3a SET aluno = ? WHERE ID = ?', value, (err,results) => {
        if (err){
            err.send(`Erro ao alterar usuario, ${err}`)
        } else {
            res.send('Usuario alterado com sucesso')
        }
    })
})

app.delete('/alunos/deletar/:id',(req, res) => {
    const id = req.params.id
    banco_de_dados.query('DELETE FROM 3a WHERE ID=?', id, (err, results) => {
        if (err){
            res.send(`Erro ao deletar ${err}`)
        } else {
            res.send('dados deletados com sucesso')
        }
    })
})

app.listen(port, () => {
    console.log('🐟 O servidor está no ar🐟')
})