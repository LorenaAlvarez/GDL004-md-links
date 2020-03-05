const mdlinks = require('./module.js')
const path = process.argv[2];

const options = {
    validate: process.argv[3],
    stats: process.argv[4],
}


let resultado = mdlinks (path, options)

 
  
