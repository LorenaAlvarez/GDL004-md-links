const mdlinks = require('./index.js')
const path = process.argv[2];

let options = {
    validate: false,
    stats: false
};


if (process.argv.indexOf('--validate') > -1){
    options.validate = true;
}

if (process.argv.indexOf('--stats') > -1){
     options.stats = true;
};
  
mdlinks(path, options).then((links) => {

    if(options.validate && options.stats){
        for (let key in links) {
            console.log(key + ': ' + links[key])
        } 
    } else if(options.validate){
        links.forEach((l) => {
            console.log(' '+l.file+' '+l.href+' '+l.statusText+' '+l.status+' '+l.text)
        });
    } else if (options.stats){
        for (let key in links) {
            console.log(key + ': ' + links[key])
        }
    } else {
        console.log(links);
    }
    
}).catch((err)=> {
    console.log(err)
})


  
