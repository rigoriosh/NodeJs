const fs = require('fs');
var colors = require('colors');

const crearTablaMultiplicar = async(base = 5, listar, hasta) => {

    try {
        
        let salidaConsola = '';
        let salidaArchivo = '';
        for (let index = 1; index < hasta + 1; index++) {
                        salidaConsola += `${base} ${'x'.cyan} ${index} ${'='.cyan}  ${index * base}\n`;
                        salidaArchivo += `${base} x ${index} = ${index * base}\n`;
        }
        if (listar){
            console.log("===========================".rainbow)
            console.log(colors.america(`tabla del `), colors.bgCyan(base))
            console.log("===========================".rainbow);
            console.log(salidaConsola.red);
        }
        await fs.writeFileSync(`./outFiles/tabla-${base}.txt`, salidaArchivo);
        return `The file tabla-${base}.txt was created`
    } catch (error) {
        throw error
    }
    
}


module.exports = {
    crearTablaMultiplicar
}