const express = require("express");
const { engine } = require('express-handlebars');
const mysql = require("mysql");

const app = express();

app.engine('handlebars', engine({ extname: '.hbs', defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: 'nodemysql',
})

conn.connect(function(err) {
  if(err) {
    console.log(err)
  }

  console.log('Conectado com sucesso!')

  app.listen(3000)
})
