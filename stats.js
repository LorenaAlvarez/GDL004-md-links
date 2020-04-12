module.exports.stats = (urls, validate= false) => { 

  let counts = {}
  let statsObject = {total:urls.length};
  let uniques = 0; 
  let broken = 0;

 
  for (let url of urls) {
    if(validate){
      if(url.status >= 300 || url.status < 200 ){
        broken++
        statsObject.broken = broken
      }
    }

    if (counts[url.href]) { 
      counts[url.href] = counts[url.href] + 1
    } else {
      counts[url.href] = 1
    }
  }
  
  for (let number in counts) {
   
    if (counts[number] === 1 ) {
      uniques++
      statsObject.uniques = uniques
    }
 
  }
  
  if(counts.hasOwnProperty('broken') ){
    return statsObject;
  }
 

  return statsObject
}