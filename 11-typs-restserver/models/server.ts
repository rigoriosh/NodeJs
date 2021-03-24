import express, { Application } from 'express';
import cors from "cors";
import userRoutes from "../routs/usuarioRout";
import db from '../db/connection';

class Servidor {
    // private app: express.Application;

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios' // para emplearlo eje postman con => localhost:2113/api/usuarios
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.dbConnection();
        this.middlewars();
        this.routes();
    }
    middlewars(){
        // CORS
        this.app.use(cors());
        // LECTURA DEL BODY
        this.app.use(express.json());

        // CARPETA PUBLICA
        this.app.use(express.static('public'));
    }
    routes(){
        this.app.use(this.apiPaths.usuarios, userRoutes);
    }

    listen(){
        this.app.listen(Number(this.port), ()=>{
            console.log('Servidor corriendo en puerto: ' + this.port);
        });
    }

    async dbConnection(){
        try {
            await db.authenticate();
            console.log('DB is connected');
        } catch (error) {
            throw new Error(error);
        }
    }

}

export default Servidor;
