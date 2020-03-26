const ruta = require('path');

module.exports.validateExtention = ( path ) => {
    let ext = ruta.extname(path);
    if (ext === '.md') {
        return true;
    } else {
        return false;
    }
}