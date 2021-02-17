
require('colors');

const { inquirerMenu, pausa } = require('./helpers/inquirer');




const main = async() => {

    let opt = ''
    do {        
        opt = await inquirerMenu();
        console.log({opt});
        if(opt !== '7') await pausa();
    } while (opt !== '7');
    console.clear();

}


main();