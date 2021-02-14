const argv = require('yargs')
    .options({
        'b': {
        alias: 'base',
        demandOption: true,        
        describe: 'is base multiplicate table',
        type: 'number'
        },
        'l':{
            alias: 'listar',
            type: 'boolean',
            demandOption: true,
            default: false,
            describe: 'Show de table on console'
        },
        'h':{
            alias: 'hasta',
            type: 'number',
            demandOption: true,            
            describe: 'Limit to multiplications',
            default: 10
        }
    })
    .check((argv, options) => {
        console.log('yargs', argv)
        if (isNaN(argv.b)) {
            throw 'Error: el argumento -b debe ser un numero'
        }else if ( isNaN(argv.h)) {
            throw 'Error: el argumento -b debe ser un numero'
        }
        return true;
    }).argv;

module.exports = argv;