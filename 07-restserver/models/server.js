const express = require('express');
const cors = require('cors');
 



class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoutPat = '/api/usuarios'; // endpoint de usuarios

        //Middlewares osea los use => son funciones q añaden otras funcionalidades
        this.middlewares();
        // Rutas de mi aplicacione
        this.routes();
    }

    middlewares(){
        //cors
        this.app.use(cors());
        //Directorioo publico
        this.app.use(express.static('public'));//cuando se emplea la palabra use se refiere a middlewar
        
    }

    routes() {//controlador de rutas
        
        this.app.use(this.usuariosRoutPat, require('../routes/routUser'));
        

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`app listening at http://localhost:${this.port}`)
          })
    }
}



module.exports = Server;