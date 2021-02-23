
const {v4: uuidv4} = require('uuid');
const Tarea = require('./tarea');

class Tareas {

    constructor(){
        this._listado = {}
    }

    borrarTarea(id = ''){
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    crearTarea (desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
        
    }

    cargarTareasFromArray(tareas){
        
            tareas.forEach(t => {
                this._listado[t.id] = t;
            });                    
    }

    get listarTareas(){
        
        const listado = [];
        
        Object.keys(this._listado).forEach(e => listado.push(this._listado[e]))        

        return listado;
    }

    listadoCompleto(){        
        console.log('');
        let estado = '';
        let color = '';
        this.listarTareas.forEach((t, i) => {            
            if(t.completadoEn){
                estado = 'Completada';
                color = 'green';
             }else{
                 estado = 'Pendiente'
                 color = 'red';
             }
            console.log(`${(i+1).toString().green}. ${t.desc} :: ${estado[color]}`);
        })
    }

    listarPendientesCompletadas(completadas = true){
        let cont = 1;
        this.listarTareas.forEach(e => {
            if(completadas && e.completadoEn !== null){
                console.log(`${cont.toString().green}. ${e.desc} - ${e.completadoEn.green}`);
                cont++;
            }else if(!completadas && e.completadoEn === null){
                console.log(`${cont.toString().green}. ${e.desc} - ${e.completadoEn}`)
                cont++;
            }
        })
    }

    toggleCompletados(ids = []){        
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (tarea.completadoEn == null) {
                tarea.completadoEn = new Date().toISOString()
            }
        })
         
        this.listarTareas.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }

}


module.exports = Tareas;