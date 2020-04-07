const mdlinks = require('./module.js')
const path = process.argv[2];

let options = {
    validate: false,
    stats: false
};

//includes()
if (process.argv.indexOf('--validate') > -1){
    options.validate = true;
}

if (process.argv.indexOf('--stats') > -1){
     options.stats = true;
};
 
mdlinks(path, options).then((links) => {
  /*   return links; */
    console.log(links)

    /* console.log(links); */
    /**
     * We will handle the data to write in console.
     */
    /*console.log('ESTAMOS AFUERA DE module.js')
    links.forEach((l) => {console.log(l)});*/
}).catch((err)=> {
    console.log(err)
})

 
  
