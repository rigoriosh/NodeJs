const inquirer = require('inquirer'); //https://www.npmjs.com/package/inquirer#documentation  // libreria para menus en consola

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1'.green}. Crear tarea'`
            },
            {
                value: '2',
                name: `${'2'.green}. Listar Tareas`
            },
            {
                value: '3',
                name: `${'3'.green}. Listar Tareas completadas`
            },
            {
                value: '4',
                name: `${'4'.green}. Listar Tareas pendientes`
            },
            {
                value: '5',
                name: `${'5'.green}. Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6'.green}. Borrar tarea`
            },
            {
                value: '7',
                name: `${'7'.green}. Salir`
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
    console.clear();
}

const leerInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Por favor ingrese un valor'
                }
                return true
            }
        }
    ];
    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async(tareas = []) => {
    

    const choices = tareas.map((tarea, index) => {
        return {
            value: tarea.id,
            name: `${(index + 1).toString().bold}. ${tarea.desc}`
        }
    });

    choices.unshift({
        value: 0,
        name: '0.'.cyan + 'Cancelar'
    })
    
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: '¿Seleccione tarea a borrar?',
            choices
        }
    ]    

    const {id} = await inquirer.prompt(preguntas);
    return id;


}

const confirmar = async(message) => {
    const question = {
        type: 'confirm',
        name: 'ok',
        message
    };
    const {ok} = await inquirer.prompt(question);
    if(ok) console.log('Tarea borada');
    return ok;
}

const mostrarListadoCheckList = async(tareas = []) => {
    const choices = tareas.map((tarea, index) => {
        return {
            value: tarea.id,
            name: `${(index + 1).toString().bold}. ${tarea.desc}`,
            checked: (tarea.completadoEn !== null) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]    

    const {ids} = await inquirer.prompt(pregunta);
    return ids;


}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
}