const fs = require('fs');
module.exports.links = ( path ) => {

    return new Promise((resolve, reject) => {
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
                resolve(arrayLinks);
            }   
        });
    });
}