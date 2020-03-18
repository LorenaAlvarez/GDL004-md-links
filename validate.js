const urlExists = require('url-exists');


module.exports.validateUrls = (urls) => {     
    for (let link of urls){
        urlExists(link.href, function(err, exists) {
            if (exists) {
                console.log(link.href + ': OK URL');
            } else {
                console.log(link.href + ': FAIL URL');
            }
        });
    }  
}
