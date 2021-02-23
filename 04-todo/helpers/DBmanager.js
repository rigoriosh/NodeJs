const fs = require('fs'); //file sistem


const archivo = './db/info.json';

const guardarInfo = (data) => {
    fs.writeFileSync(archivo, JSON.stringify(data));
}

const leerDB = () => {

    if (!fs.existsSync()) {
        return JSON.parse(fs.readFileSync(archivo, { encoding: 'utf-8'}));
    }
    return []

    
}


module.exports = {
    guardarInfo, 
    leerDB
}