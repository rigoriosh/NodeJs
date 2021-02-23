const axios = require('axios');


class Busquedas {

    constructor(){
        this.historial = ['Bogota', 'Madrid', 'San Jose']
        // TODO: leer DB si existe
    }

    async buscarCiudad(ciudad = ''){
        // peticion http

        try {
            const r = await axios.get('https://reqres.in/api/users?page=2');            
            console.log(r.data);
            return []
        } catch (error) {
            console.log(error)
        }
                
        

        
            

        return [] // retornar los lugares q coincidan con la ciudad ingresada
    }
}

module.exports = Busquedas;