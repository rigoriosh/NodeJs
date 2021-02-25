require('colors');
require('dotenv').config() // esta instalación mas el archivo .env (ubicado en la raiz de la carpeta), para agregan variables de entorno

//console.log(process.argv); 
//console.log(process.env);   //variables de entorno
//console.log(process.env.MAPBOX_KEY);

const { 
    leerInput,
    pausa,
    inquirerMenu, listarLugares
    } = require('./helpers/inquirer');
const Busquedas = require('./models/busqueda');

const main = async() => {

    const busquedas = new Busquedas();    
    let opt;
    let lugares;
    let idLugar;
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                //mostrar mensaje
                const lugar = await leerInput('Ingresa lugar a buscar: ');
                // buscar los lugares
                lugares = await busquedas.buscarCiudad(lugar);
                //console.log('lugares => ', lugares);
                //seleccionar el lugar
                idLugar = await listarLugares(lugares);
                //console.log(idLugar, lugares.length);
                if (idLugar !== lugares.length + 1 && idLugar !== '0') {                                    
                    // get clima data
                    
                    // show result
                    //console.log('infor de la ciudad'.green);
                    let {nombre, lat, lng} = lugares.find(lugar => lugar.id === idLugar);
                    busquedas.agregarHistorial(nombre);
                    const dataLugar = await busquedas.climaLugar(lat, lng);
                    const {desc, temp, tMin, tMax} = dataLugar;                    
                    //console.log('dataLugar => ', dataLugar);
                    //console.log('luagrSelected => ', luagrSelected);
                    console.clear();
                    console.log(`
                        ${'Ciudad:'.green} ${nombre}
                        ${'Latitud:'.green} ${lat}
                        ${'Long:'.green} ${lng}
                        ${'Temp:'.green} ${temp}
                        ${'Temp min:'.green} ${tMin}
                        ${'Temp max:'.green} ${tMax}
                        ${'Estado clima:'.green} ${desc} 
                    `);
                }    
                break;
                case 2:                    
                    busquedas.historyCapitalizado.forEach((l, i) => console.log(i+1, l));
                break;
            default:
                break;
        }
        //console.log({opt});
        if(opt !== 3 && (idLugar !== lugares?.length + 1)) await pausa();
    } while (opt !== 3);
    console.clear();
}


main();