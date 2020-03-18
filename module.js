const fs = require('fs');
const ruta = require('path');
const { validateUrls } = require('./validate.js')

const options = {
    validate: process.argv[3] === '-v',
    stats: process.argv[3] === '-s',
}

module.exports = addExp = (path) => {

    let ext = ruta.extname(path)
    if(ext === '.md'){
        console.log(path);
    }else {
        console.log('File extension is invalid');
        return;
    };


    let promise = new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            } else {
                    const exp = /\[((.*))\]\(((http|https|ftp|ftps).+?)\)/g;
                    const regExpObj = /\[(.*)\]\((.*)\)/;
                    let links = data.match(exp)
                    let arrayLinks = []

                for (let i = 0; i < links.length; i++) {
                    const exec = regExpObj.exec(links[i])

                    let object = {
                        href: exec[2],
                        text: exec[1],
                        file: path
                    }
                    arrayLinks.push(object)
                }                
                resolve (arrayLinks);
            }   
        });
    });
     promise.then(links => {
         if(options.validate === false && options.stats === false){
             console.log(links);             
         } else if(options.validate === true){
             validateUrls(links)
         }      

    }); 
}
