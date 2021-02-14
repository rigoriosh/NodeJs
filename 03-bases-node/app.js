const { options } = require("yargs");
const { crearTablaMultiplicar } = require("./js/multiplicar");
const argv = require('./config/yargs');
require('colors');


/* 
    const [,,arg3='base=5'] = process.argv;
    let [, base = 5] = arg3.split('=')
    base = parseInt(base);
    console.log(base);
 */

console.clear();
console.log("////////")
//console.log(process.argv);
console.log("////////")
console.log(argv);
console.log(argv.base);

console.log(argv.l)
if(argv.l){
    console.log('ok')
    crearTablaMultiplicar(argv.base, argv.l, argv.h)
    .then(r => console.log(r.green))
    .catch(e => console.log(e))
}else{
    crearTablaMultiplicar(argv.base, argv.h)
    .then(r => console.log(r))
    .catch(e => console.log(e))
}



