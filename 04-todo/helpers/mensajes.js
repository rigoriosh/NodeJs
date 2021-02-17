const { resolve } = require('path')


const mostrarMenu = () => {

    return new Promise( resolve => {

        showInitMenu();        

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question('Seleccione una opción: ', (answer) => {                 
            readline.close();
            resolve(answer);
        })
    });
}

const pausa = () => {

    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\Presione ${'ENTER'.green} para continuar: \n`, (answer) => {                    
            readline.close();
            resolve();
        })
    })    
}

const showInitMenu = () =>{
    console.clear();
    console.log('\n\n       =============================='.green)
    console.log('       Seleccione una opción')
    console.log('       ==============================\n'.green)

    console.log(`       ${'1.'.green} Crear Tarea`);
    console.log(`       ${'2.'.green} Listar Tareas`);
    console.log(`       ${'3.'.green} Listar Tareas completadas`);
    console.log(`       ${'4.'.green} Listar Tareas pendientes`);
    console.log(`       ${'5.'.green} Completar tarea(s)`);
    console.log(`       ${'6.'.green} Borrar tarea`);
    console.log(`       ${'0.'.green} Salir \n`);
}

module.exports = {
    mostrarMenu,
    pausa
}