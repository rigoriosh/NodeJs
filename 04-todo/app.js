
require('colors');

const { inquirerMenu, pausa } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');




const main = async() => {

    let opt = ''
    do {        
        /* opt = await inquirerMenu();
        console.log({opt}); */
        const tarea = new Tarea('comprar');
        console.log(tarea)
        if(opt !== '7') await pausa();
    } while (opt !== '7');
    console.clear();

}


main();