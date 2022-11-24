const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  const user = {
    name: "Lucimara",
    surname: "Souza",
  };

  res.render("home", { user });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
