import express, { Application } from 'express';

class Servidor {
    // private app: express.Application;

    private app: Application;
    private port: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
    }

    listen(){
        this.app.listen(Number(this.port), 'hostinRigo', 55, ()=>{
            console.log('Servidor corriendo en puerto: ' + this.port);
        });
    }
}

export default Servidor;
