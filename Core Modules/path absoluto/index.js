const path = require("path");

// path absoluto
console.log(path.resolve("teste.js"));

// formar path
const midFolder = "relatorios";
const fileName = "lucimara.txt";

const finalPath = path.join("/", "arquivos", midFolder, fileName);

console.log(finalPath);