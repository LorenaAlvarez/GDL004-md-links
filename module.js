const fs = require('fs');
const { validateExtention } = require('./validateExtention.js');
const { validateUrls } = require('./validate.js')


module.exports = addExp = (path, options) => {

    let mainPromise = new Promise((resolve, reject) => {

        console.log(validateExtention(path))
    if(validateExtention(path)){
        let readFilePromise = new Promise((resolve, reject) => {
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
    
        readFilePromise.then((data)=>{
            if(options.validate === true && options.stats === true){
               // return links;             
            } else if(options.validate === true){
                //validateUrls(links)
                resolve('Ejecutar validate')
            }  else if(options.stats === true){
               //validateUrls(links)
           }else{
             resolve(data)
           }
            
        })
        .catch((err) => {
            reject(err);
        })
    
    }else {
       
        reject("Extension isn't valid")
    }

})

return mainPromise;

}
