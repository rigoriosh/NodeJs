const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/configDB');
 



class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoutPat = '/api/usuarios'; // endpoint de usuarios

        /* conectar a DB */
        
        this.conectarDB();

        //Middlewares osea los use => son funciones q añaden otras funcionalidades
        this.middlewares();
        // Rutas de mi aplicacione
        this.routes();
    }

    async conectarDB(){        
        await dbConnection();
    }

    middlewares(){//middleware globales
        //cors
        this.app.use(cors());

        /* 
            middlewar q se encarga de la lectura y parseo del body, para los put, post, y delete,
            toda la información q venga desde el front la serializa a formato json
         */
        this.app.use(express.json());

        //Directorioo publico
        this.app.use(express.static('public'));//cuando se emplea la palabra use se refiere a middlewar
        
    }

    routes() {//controlador de rutas
        
        this.app.use(this.usuariosRoutPat, require('../routes/routUser'));
        
    }

    listen(){
        this.app.listen(this.port, () => {
            //console.log(`app listening at http://localhost:${this.port}`)
          })
    }
}



module.exports = Server;