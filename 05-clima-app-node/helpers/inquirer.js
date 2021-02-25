const inquirer = require('inquirer'); //https://www.npmjs.com/package/inquirer#documentation  // libreria para menus en consola

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1'.green}. Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2'.green}. Historial`
            },
            {
                value: 3,
                name: `${'3'.green}. Salir`
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

const listarLugares = async(lugares = []) => {
    
    const choices = lugares.map((lugar, index) => {
        return {
            value: lugar.id,
            name: `${(index + 1).toString().green.bold}. ${lugar.nombre}`
        }
    });

    choices.push({
        value: lugares.length + 1,
        name: (lugares.length + 1).toString().cyan + ' Cancelar'
    })
    
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: '¿Seleccione item?',
            choices
        }
    ]    

    const {id} = await inquirer.prompt(preguntas);
    return id;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList,
    listarLugares
}