import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
// Middlewares
import { verificarToken } from './middlewares/verificar-token.js'
// Routers 
import { routerUsuario } from './routes/usuario/router.js';
import { routerCuenta } from './routes/cuenta/router.js';
import { routerTarjeta } from './routes/tarjeta/router.js';
import { SERVER_PORT } from "./config/env.js"


const app = express();
// Middlewares 
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
// Enlaces publicos
app.use('/usuario', routerUsuario);
// Enlaces privados
app.use(verificarToken);
app.use('/cuenta', routerCuenta);
app.use('/tarjeta', routerTarjeta);
// Ejecutar el servidor
app.listen(SERVER_PORT, () => {
    console.log("Server corriendo 🏃", SERVER_PORT)
});