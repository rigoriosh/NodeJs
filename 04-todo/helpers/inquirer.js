const inquirer = require('inquirer');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: '1. Crear tarea'
            },
            {
                value: '2',
                name: '2. Listar Tareas'
            },
            {
                value: '3',
                name: '3. Listar Tareas completadas'
            },
            {
                value: '4',
                name: '4. Listar Tareas pendientes'
            },
            {
                value: '5',
                name: '5. Completar tarea(s)'
            },
            {
                value: '6',
                name: '6. Borrar tarea'
            },
            {
                value: '7',
                name: '7. Salir'
            }
        ]
    }
]

const inquirerMenu = async() => {
    //console.clear();
    console.log('\n\n       =============================='.green)
    console.log('       Seleccione una opción')
    console.log('       ==============================\n'.green)

    const {opcion} = await inquirer.prompt(preguntas);
    console.log(opcion)
    return opcion;
}

const pausa = async() => {
    await inquirer.prompt([
        {
            type: 'input',
            name: 'pause',
            message: `\n Presione ${'ENTER'.green} para continuar: \n`
        }
    ]);
    
}

module.exports = {
    inquirerMenu,
    pausa
}