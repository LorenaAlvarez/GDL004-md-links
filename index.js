const { validateExtension } = require('./validateExtension.js');
const { validateUrls } = require('./validate.js')
const { links } = require('./links.js')
const { stats } = require('./stats.js')

module.exports = addExp = (path, options) => {

    return new Promise((resolve, reject) => {
    if (validateExtension(path)){
        links(path).then((objLinks) => {
            if (options.validate === true && options.stats === true) {
                validateUrls(objLinks).then((res)=>{
                    resolve(stats(res, options.validate))
                })       
            } else if (options.validate === true) {
                validateUrls(objLinks).then(response => {
                    resolve(response)
                }) 
            } else if (options.stats === true) {
               resolve(stats(objLinks))
            } else {
                resolve(objLinks)
           }
            
        })
        .catch((err) => {
            reject(err);
        })
    
    }else {
       
        reject("Extension isn't valid")
    }

  })

  //return mainPromise;

}
