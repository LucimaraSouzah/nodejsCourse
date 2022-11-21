const fs = require('fs')

console.log('Início')

fs.writeFileSync('arquivo.txt', 'Olá mundo')

console.log('Fim')