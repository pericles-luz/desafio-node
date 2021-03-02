const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  const config = {
    host: 'mysql',
    user: 'root',
    password: 'root',
    database: 'nodedb'
  }
  const mysql = require('mysql')
  const connection = mysql.createConnection(config)
  const sql = `INSERT INTO people(name) values('Teste')`;
  connection.query(sql)

  var resposta = '<h1>Full Cycle Rocks!</h1>';
  connection.query(`SELECT name FROM people`, function(error, result) {
    if (error) {
      throw error;
    }
    console.log(result)
    var rows = JSON.parse(JSON.stringify(result));
    console.log(rows)
    resposta += '<ul>'; 
    rows.forEach((row) => {
      resposta = resposta + `<li>${row.name}</li>`;
      console.log('aqui', row.name)
    })
    resposta += '</ul>'; 
    res.send(resposta)
  })
  connection.end()
})

app.listen(port, () => {
  console.log('Rodando na porta ' + port)
})