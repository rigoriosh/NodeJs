require('colors');
const { 
    leerInput,
    pausa,
    inquirerMenu
    } = require('./helpers/inquirer');
const Busquedas = require('./models/busqueda');

const main = async() => {

    const busquedas = new Busquedas();    
    let opt;
   do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                //mostrar mensaje
                const lugar = await leerInput('Ingresa lugar a buscar: ');
                // buscar los lugares
                await busquedas.buscarCiudad(lugar);
                //seleccionar el lugar

                // get clima data

                // show result
                console.log('infor de la ciudad'.green);
                console.log(`
                    Ciudad: 
                    Latitud: 
                    Long:
                    Temp:
                    Temp min:
                    Temp max:
                `);
                break;
        
            default:
                break;
        }
        console.log({opt});
        if(opt !== 3) await pausa();
   } while (opt !== 3);
   console.clear()
   
}


main();