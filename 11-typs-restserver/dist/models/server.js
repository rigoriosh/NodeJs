"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const usuarioRout_1 = __importDefault(require("../routs/usuarioRout"));
const connection_1 = __importDefault(require("../db/connection"));
class Servidor {
    constructor() {
        this.apiPaths = {
            usuarios: '/api/usuarios' // para emplearlo eje postman con => localhost:2113/api/usuarios
        };
        this.app = express_1.default();
        this.port = process.env.PORT || '8000';
        this.dbConnection();
        this.middlewars();
        this.routes();
    }
    middlewars() {
        // CORS
        this.app.use(cors_1.default());
        // LECTURA DEL BODY
        this.app.use(express_1.default.json());
        // CARPETA PUBLICA
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, usuarioRout_1.default);
    }
    listen() {
        this.app.listen(Number(this.port), () => {
            console.log('Servidor corriendo en puerto: ' + this.port);
        });
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('DB is connected');
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.default = Servidor;
//# sourceMappingURL=server.js.map