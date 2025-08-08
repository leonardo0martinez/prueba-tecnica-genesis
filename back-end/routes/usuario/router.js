// -------------------------------------------------------------------------------
// ROUTER DE USUARIO
// -------------------------------------------------------------------------------
import express from 'express';
export const routerUsuario = express.Router();
// Endpoints 
import { login } from "./controllers/login.js"
import { registrar } from './controllers/registrar.js';

routerUsuario.post("/login", login);
routerUsuario.post("/registrar", registrar);

