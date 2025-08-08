// -------------------------------------------------------------------------------
// ROUTER DE CUENTA 
// -------------------------------------------------------------------------------
import express from 'express';
export const routerTarjeta = express.Router();
import { listado } from "./controllers/listado.js"
// // Endpoints 

routerTarjeta.get("/listado/:cuenta_id", listado);

