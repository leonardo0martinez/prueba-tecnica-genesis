// -------------------------------------------------------------------------------
// ROUTER DE CUENTA 
// -------------------------------------------------------------------------------
import express from 'express';
export const routerCuenta = express.Router();
import { editar } from "./controllers/editar.js"
import { info } from "./controllers/info.js"
// Endpoints 
routerCuenta.post("/editar", editar);
routerCuenta.get("/info/:cuenta_id", info);

