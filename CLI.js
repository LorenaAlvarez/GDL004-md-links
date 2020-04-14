#!/usr/bin/env node

const mdlinks = require('./index.js')
const chalk = require('chalk')

const path = process.argv[2];

let options = {
    validate: false,
    stats: false
};


if (process.argv.includes('--validate') || process.argv.includes('-v')){
    options.validate = true;
}

if (process.argv.includes('--stats') || process.argv.includes('-s')){
     options.stats = true;
};
  
mdlinks(path, options).then((links) => {

    if(options.validate && options.stats){
        for (let key in links) {
            console.log(chalk.yellow(key + ': ' )+ links[key])
        }
    } else if(options.validate){
        links.forEach((l) => {
            let color = 'green'
            if (l.status === 400){
                color = 'red'
            }      
            console.log(chalk.yellow(l.file+' ')+chalk[color](l.href+' '+l.statusText+' '+l.status+' '+l.text))
        });
    } else if (options.stats){
        for (let key in links) {
            console.log(chalk.yellow(key + ': ' )+ links[key])
        }
    } else {
        links.forEach((l) => {
            console.log(chalk.yellow(' '+l.file+' ')+l.href+' '+chalk.magenta(l.text))
        });
    }
    
}).catch((err)=> {
    console.log(err)
})


  
