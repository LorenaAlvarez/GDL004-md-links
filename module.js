const fs = require('fs');
const urlExists = require('url-exists');


module.exports = addExp = (path) => {
    // extension .md
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
                        text: exec[1],
                        href: exec[2],
                        file: path
                    }
                    arrayLinks.push(object)
                }                
                resolve (arrayLinks);
            }   
        });
    });
     promise.then(console.log) 


     validateUrls = (links) => { 
        for (let link of links){
            urlExists(link, function(err, exists) {
                if (exists) {
                  console.log('OK URL');
                } else {
                  console.log('FAIL URL');
                }
              });
        }
    }
    promise.then(validateUrls)
} 


 /* }  */
