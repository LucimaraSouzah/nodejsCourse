const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.get("/", (req, res) => {
  const user = {
    name: "Lucimara",
    surname: "Souza",
  };

  const auth = true;

  const approved = true

  res.render("home", { user, auth, approved });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
