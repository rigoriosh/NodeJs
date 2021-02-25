const fs = require('fs');
const axios = require('axios');


class Busquedas {

    constructor(){
        this.historial = ['Bogota', 'Madrid', 'San Jose']        
        // TODO: leer DB si existe
        this.leerDB();
    }

    get paramsMapBox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    async buscarCiudad(lugar = ''){
        // peticion http
        console.log('Please wait a moment');
        try {
            //const r = await axios.get('https://reqres.in/api/users?page=2');   
            //const r = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/-76.30833029869518%2C2.9613802515978023.json?access_token=pk.eyJ1Ijoicmlnb3Jpb3NoIiwiYSI6ImNrbGt2dGN4NDB4MmYzMm13d3FlajJoYWcifQ.NnvpbhNuRE4dIx_2D66JGw&language=es');            
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapBox
            });
            const resp = await instance.get();
            /* 
                console.log(resp.data.features);
                console.log(resp.data.features[0].geometry.coordinates);
             */
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));
        } catch (error) {
            console.log(error)
        }
           
        return [] // retornar los lugares q coincidan con la ciudad ingresada
    }

    get paramsWeather(){        
        return {           
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            //lang: 'es'
        }
    }

    async climaLugar(lat, lon){
        console.log('Please wait a moment');
        try {
            //* instancia axios
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsWeather, lat, lon}
            });
            //*resp.data
            const resp = await instance.get();
            const {weather, main} = resp.data
            //console.log(weather, main);
            return {
                desc: weather[0].description,
                temp: main.temp,
                tMin: main.temp_min,
                tMax: main.temp_max
            }
        } catch (error) {
            console.log(error);
        }
    }

    agregarHistorial(lugar = ''){
        // TODO: prevenir duplicados
        if (this.historial.includes(lugar.toLowerCase())) return;

        this.historial = this.historial.splice(0,5);//solo deja los primeros 6 elementos, los demas los borra.
        this.historial.unshift(lugar.toLowerCase());
        this.guardarDB();
    }

    dbPath = './db/dtabase.json';

    guardarDB(){
        const payload = {
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload) );
    }
    leerDB(){
        
        if(!fs.existsSync(this.dbPath)) return;
        
        const db = JSON.parse(fs.readFileSync(this.dbPath, {encoding: 'utf-8'}));        
        this.historial = db.historial;
                 
    }

    get historyCapitalizado(){
        //console.log('this.historial => ', this.historial);
        return this.historial.map(e => {
            let palabra = e.split(' ');
            palabra = palabra.map(esteEs => esteEs[0].toLocaleUpperCase() + esteEs.substring(1));
            return palabra.join(' ');
        })
    }
}

module.exports = Busquedas;