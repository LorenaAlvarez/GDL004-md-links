const fs = require('fs');
const urlExists = require('url-exists');
const ruta = require('path');

  


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
    /* promise.then(console.log) */

    validateUrls = (links) => { 
        for (let link of links){
            urlExists(link.href, function(err, exists) {
                if (exists) {
                    console.log(link.href + ': OK URL');
                } else {
                    console.log(link.href + ': FAIL URL');
                }
            });
        }  
    }
    promise.then(validateUrls)
} 
