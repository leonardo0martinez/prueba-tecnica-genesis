import jwt from "jsonwebtoken";
import { JWT_TOKEN } from "../config/env.js";

export const verificarToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if(bearerHeader){
        const token = bearerHeader.split(" ")[1];
        // Verificar si el token es válido
        jwt.verify(token, JWT_TOKEN, (error, authData) => {
            if(error){
                res.status(401).json({ resultado: false, mensaje: "Token inválido 👀"});
            } else {
                // Verificar expiración de token
                if(Date.now() < authData.exp){
                    req.cuenta = authData.cuenta;
                    next();
                } else {
                    res.status(403).json({ resultado: false, mensaje: "Sesión ha expirado ⌛"});
                }
            }
        })
    } else {
        res.status(401).json({ resultado: false, mensaje: "No autorizado 🙅"});
    }

}