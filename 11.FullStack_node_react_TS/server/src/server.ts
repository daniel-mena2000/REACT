import express from "express";
import router from "./router";
import colors from "colors";
import cors, {CorsOptions} from "cors"
import swaggerUi from 'swagger-ui-express'
import morgan from "morgan";
import { swaggerSpec } from './config/swagger'

import db from "./config/db";


async function connectBD() {
    try {
        await db.authenticate();
        await db.sync();
    } catch (error) {
        console.log(error);

        console.log(colors.red.black('Hubo un error al conectar a la BD'));

    }
}

connectBD();

const server = express()

//Permitir conexiones}
//Origin es quien estan enviando la peticion
//callbach - Nos permitira aceptar la conexion o negarla, recibe 2 parametros, el error, si hay un error no permite la conexion, si todo va bien la permite con true
//!origin → permite requests sin origen (no navegador)
//origin === FRONTEND_URL → permite tu frontend
const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (!origin || origin === process.env.FRONTEND_URL) {
                callback(null, true)
        }else{
            callback(new Error('Error de CORS'))
        }

    }
}

server.use(cors(corsOptions))

server.use(express.json());

server.use(morgan('dev'))

server.use('/api/products', router);

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default server;
