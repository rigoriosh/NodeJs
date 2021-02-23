
require('colors');

const { guardarInfo, leerDB } = require('./helpers/DBmanager');
const { 
    inquirerMenu, 
    pausa, 
    leerInput, 
    listadoTareasBorrar, 
    confirmar,
    mostrarListadoCheckList
    } = require('./helpers/inquirer');

const Tareas = require('./models/tareas');

const main = async() => {    
    let opt = '';
    
    const tareas = new Tareas();
    /// leer db y cargarlo en memoria
    tareas.cargarTareasFromArray(leerDB());
    
    do {        
        console.clear();
        opt = await inquirerMenu();        
        await acciones(opt, tareas);        
        if(opt !== '7') guardarInfo(tareas.listarTareas);
        
        
    } while (opt !== '7');
    console.clear();

}

const acciones = async(opc, tareas)=>{    
    switch (opc) {
        case '1':
            const miTarea = await leerInput('Cual es la tarea a ingresar?:')            
            tareas.crearTarea(miTarea);
            break;
        case '2':
            tareas.listadoCompleto();
            await pausa();
            break;
        case '3':
            tareas.listarPendientesCompletadas(true);
            await pausa();
            break;    
        case '4':
            tareas.listarPendientesCompletadas(false);
            await pausa();        
            break;
        case '5':
            const ids = await mostrarListadoCheckList(tareas.listarTareas);
                           
                tareas.toggleCompletados(ids);
                //await pausa();                
               
            break;
        case '6':
            const id = await listadoTareasBorrar(tareas.listarTareas);
            if (id !== 0) {            
                if( await confirmar('Seguro de borrar!')) tareas.borrarTarea(id);                        
                await pausa();
            }
            break;
        default:
            break;
    }
}


main();