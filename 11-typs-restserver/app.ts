import dotenv from "dotenv";
import Servidor from "./models/server";

/* COnfigurar donenv */
dotenv.config();

const servidor = new Servidor();

servidor.listen();