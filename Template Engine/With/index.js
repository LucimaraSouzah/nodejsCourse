const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/dashboard", (req, res) => {
  const items = ["item a", "item b", "item c"];

  res.render("dashboard", { items });
});

app.get("/post", (req, res) => {
  const post = {
    title: "Aprender Node.js",
    category: "Node.js",
    body: "Este artigo é sobre Node.js",
  };

  res.render("post", { post });
});

app.get("/", (req, res) => {
  const user = {
    name: "Lucimara",
    surname: "Souza",
  };

  const auth = true;

  const approved = true;

  res.render("home", { user, auth, approved });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
